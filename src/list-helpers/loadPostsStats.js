import fs from 'fs/promises'
import { google } from 'googleapis'
import { POSTS_DIR } from '../constants.js'

if (!global.loadingGaStatsPromise) {
  global.loadingGaStatsPromise = null
}

// GA4 Data API v1beta
const GA_VERSION = 'v1beta'

export async function mergeWithAnalytics(posts, config) {
  const gaCfg = config.site.themeConfig.googleAnalytics

  // Валидация конфигурации
  if (!gaCfg?.propertyId) {
    console.warn('⚠️ Google Analytics не настроен: отсутствует propertyId')
    return posts
  }

  // Проверяем наличие учетных данных (поддерживаем ADC)
  if (!gaCfg?.credentialsJson && !gaCfg?.credentialsPath) {
    console.log(
      'ℹ️ Учетные данные не указаны, будет использован Application Default Credentials'
    )
    console.log(
      '   Убедитесь, что установлена переменная GOOGLE_APPLICATION_CREDENTIALS'
    )
    console.log('   или выполнен gcloud auth application-default login')
  }

  try {
    // Получаем статистику из Google Analytics
    let stats = null

    if (global.loadingGaStatsPromise) {
      console.log('📦 Используем кэшированные данные Google Analytics')
    } else {
      console.log('🔍 Загружаем статистику из Google Analytics...')
      global.loadingGaStatsPromise = loadGoogleAnalytics(gaCfg)
    }

    stats = await global.loadingGaStatsPromise

    if (!stats || Object.keys(stats).length === 0) {
      console.warn('⚠️ Нет данных из Google Analytics')

      return posts
    }

    let postsWithStatsCount = 0

    // Объединяем посты со статистикой
    const postsWithStats = posts.map((post) => {
      const analyticsData = stats[post.url]

      if (analyticsData) postsWithStatsCount++

      return { ...post, analyticsStats: analyticsData || {} }
    })

    console.log(
      `✅ Обработано ${postsWithStatsCount} постов с аналитикой из ${posts.length} постов`
    )

    return postsWithStats
  } catch (error) {
    console.error(
      '❌ Ошибка при загрузке данных из Google Analytics:',
      error.message
    )

    return posts
  }
}

export async function loadGoogleAnalytics(gaCfg) {
  try {
    // Современный подход к аутентификации с поддержкой ADC
    let authClient = null

    if (gaCfg.credentialsJson) {
      // Приоритет: сначала используем credentialsJson с JWT конструктором
      const credentials = JSON.parse(gaCfg.credentialsJson)
      authClient = new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      })
      console.log('🔑 Используем credentialsJson для аутентификации')
    } else if (gaCfg.credentialsPath) {
      // Читаем файл и используем JWT конструктор
      const credentials = JSON.parse(
        await fs.readFile(gaCfg.credentialsPath, 'utf-8')
      )
      authClient = new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      })
      console.log(
        `🔑 Используем credentials из файла: ${gaCfg.credentialsPath}`
      )
    } else {
      // Если не указаны явные учетные данные, используем Application Default Credentials
      console.log('🔑 Используем Application Default Credentials (ADC)')
      console.log(
        '   Убедитесь, что установлена переменная GOOGLE_APPLICATION_CREDENTIALS'
      )
      console.log('   или выполнен gcloud auth application-default login')

      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      })
      authClient = await auth.getClient()
    }

    console.log('✅ Аутентификация успешно выполнена')

    // Создаем клиент Analytics Data API
    const analyticsdata = google.analyticsdata({
      version: GA_VERSION,
      auth: authClient,
    })
    const endDate = new Date()
    const startDate = new Date()

    startDate.setDate(startDate.getDate() - (gaCfg.dataPeriodDays || 30))

    console.log('🔍 Запрашиваем данные из Google Analytics...')
    console.log(
      `📅 Период: ${startDate.toISOString().split('T')[0]} - ${endDate.toISOString().split('T')[0]}`
    )
    console.log(`🏷️ Property ID: ${gaCfg.propertyId}`)

    // Подготавливаем параметры запроса
    const requestParams = {
      property: `properties/${gaCfg.propertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
          },
        ],
        metrics: [
          { name: 'screenPageViews' }, // Просмотры страниц
          { name: 'totalUsers' }, // Общее количество пользователей
          { name: 'averageSessionDuration' }, // Средняя продолжительность сессии
          // { name: 'bounceRate' }, // Показатель отказов
        ],
        dimensions: [{ name: 'pagePath' }],
        dimensionFilter: {
          // Используем CONTAINS вместо REGEXP для начала
          filter: {
            fieldName: 'pagePath',
            stringFilter: {
              matchType: 'CONTAINS',
              value: `/${POSTS_DIR}/`, // Простой поиск по подстроке
              caseSensitive: false,
            },
          },
        },
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: gaCfg.dataLimit || 1000, // Ограничиваем количество результатов
      },
    }

    console.log('📊 Отправляем запрос к Google Analytics Data API...')

    // Выполняем запрос к Google Analytics Data API
    const response = await analyticsdata.properties.runReport(requestParams)

    const stats = {}

    if (!response.data.rows || response.data.rows.length === 0) {
      console.warn('⚠️ Нет данных в ответе от Google Analytics 4')
      console.warn('   Возможные причины:')
      console.warn('   - Недостаточно данных за указанный период')
      console.warn('   - Неправильный фильтр по pagePath')
      console.warn('   - Property ID не содержит данных')
      return {}
    }

    console.log(
      `📊 Ответ от Google Analytics: Найдено ${response.data.rows?.length || 0} записей`
    )
    console.log('🔗 Первые 5 URL:')
    response.data.rows.slice(0, 5).forEach((row, index) => {
      console.log(`  ${index + 1}. ${row.dimensionValues[0].value}`)
    })

    // Обрабатываем данные из ответа
    response.data.rows.forEach((row) => {
      const pagePath = row.dimensionValues[0].value
      const metrics = row.metricValues

      // Маппинг метрик GA4 на наши поля
      stats[pagePath] = {
        pageviews: parseInt(metrics[0].value) || 0,
        uniquePageviews: parseInt(metrics[1].value) || 0,
        avgTimeOnPage: parseFloat(metrics[2].value) || 0,
        // bounceRate: parseFloat(metrics[3].value) || 0,
      }
    })

    return stats
  } catch (error) {
    console.error(
      '❌ Ошибка при запросе к Google Analytics API:',
      error.message
    )

    // Дополнительная информация об ошибке для отладки
    if (error.code === 'ENOENT') {
      const credentialsSource = gaCfg.credentialsJson
        ? 'credentialsJson'
        : 'credentialsPath'
      console.error(
        '❌ Файл с учетными данными не найден:',
        credentialsSource === 'credentialsPath'
          ? gaCfg.credentialsPath
          : 'credentialsJson'
      )
    } else if (error.code === 403) {
      console.error('❌ Нет доступа к Google Analytics. Проверьте:')
      console.error('   - Правильность propertyId')
      console.error('   - Права доступа Service Account к Google Analytics')
      console.error('   - Включен ли Google Analytics Data API в проекте')
    } else if (error.code === 400) {
      console.error('❌ Неверный запрос к Google Analytics API')
      if (error.details) {
        console.error('   Детали ошибки:', error.details)
      }
    } else if (error.code === 401) {
      console.error(
        '❌ Ошибка аутентификации. Проверьте учетные данные Service Account'
      )
    } else if (error.code === 429) {
      console.error('❌ Превышен лимит запросов к Google Analytics API')
    } else {
      console.error('❌ Неизвестная ошибка:', error.code || 'N/A')
      if (error.response?.data) {
        console.error(
          '   Ответ API:',
          JSON.stringify(error.response.data, null, 2)
        )
      }
    }

    // Возвращаем пустой объект вместо undefined для консистентности
    return {}
  }
}
