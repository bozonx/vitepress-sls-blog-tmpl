import fs from 'fs/promises'
import { google } from 'googleapis'

if (!global.loadingGaStatsPromise) {
  global.loadingGaStatsPromise = null
}

// GA4 Data API v1beta
const GA_VERSION = 'v1beta'

export async function mergeWithAnalytics(posts, config) {
  const gaCfg = config.site.themeConfig.googleAnalytics

  // Валидация конфигурации
  if (
    !gaCfg?.propertyId ||
    !(gaCfg?.credentialsPath || gaCfg?.credentialsJson)
  ) {
    console.warn('⚠️ Google Analytics не настроен')
    return posts
  }

  try {
    // Получаем статистику из Google Analytics
    let stats = null

    if (global.loadingGaStatsPromise) {
      console.log('📦 Используем кэшированные данные Google Analytics')
    } else {
      console.log('🔍 Загружаем статистику из Google Analytics...')
      global.loadingGaStatsPromise = doLoadGoogleAnalytics(gaCfg)
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

export async function doLoadGoogleAnalytics(gaCfg) {
  try {
    let credentials = null

    // Загружаем учетные данные из Service Account JSON файла
    if (gaCfg.credentialsPath) {
      credentials = JSON.parse(
        await fs.readFile(gaCfg.credentialsPath, 'utf-8')
      )
    } else if (gaCfg.credentialsJson) {
      credentials = JSON.parse(gaCfg.credentialsJson)
    } else {
      throw new Error('Не указаны учетные данные Service Account')
    }

    // Создаем клиент для GA4 Data API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    })

    const analyticsdata = google.analyticsdata({ version: GA_VERSION, auth })
    const endDate = new Date()
    const startDate = new Date()

    startDate.setDate(startDate.getDate() - (gaCfg.dataPeriodDays || 30))

    const response = await analyticsdata.properties.runReport({
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
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: gaCfg.dataLimit, // Ограничиваем количество результатов
      },
    })

    const stats = {}

    if (!response.data.rows || response.data.rows.length === 0) {
      console.warn('⚠️ Нет данных в ответе от Google Analytics 4')
      return stats
    }

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

    console.log(
      `✅ Получено ${Object.keys(stats).length} записей из Google Analytics`
    )

    return stats
  } catch (error) {
    console.error(
      '❌ Ошибка при запросе к Google Analytics API:',
      error.message
    )

    // Дополнительная информация об ошибке для отладки
    if (error.code === 'ENOENT') {
      console.error(
        '❌ Файл с учетными данными не найден:',
        gaCfg.credentialsPath
      )
    } else if (error.code === 403) {
      console.error(
        '❌ Нет доступа к Google Analytics. Проверьте права доступа и propertyId'
      )
    } else if (error.code === 400) {
      console.error('❌ Неверный запрос к Google Analytics API')
    }

    return {}
  }
}
