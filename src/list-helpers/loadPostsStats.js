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
    const stats = await fetchGoogleAnalytics(gaCfg)

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

async function fetchGoogleAnalytics(gaCfg) {
  // Создаем ключ кэша
  // const cacheKey = `ga_${gaCfg.propertyId}`

  if (global.loadingGaStatsPromise) {
    const stats = await global.loadingGaStatsPromise

    console.log('📦 Используем кэшированные данные Google Analytics')

    return stats
  }

  global.loadingGaStatsPromise = doLoadGoogleAnalytics(gaCfg)

  console.log('🔍 Загружаем статистику из Google Analytics...')

  return await global.loadingGaStatsPromise
}

export async function doLoadGoogleAnalytics(gaCfg) {
  try {
    // Загружаем учетные данные из Service Account JSON файла
    if (!gaCfg.credentialsPath) {
      throw new Error(
        'Не указан путь к файлу с учетными данными Service Account'
      )
    }

    const credentials = JSON.parse(
      await fs.readFile(gaCfg.credentialsPath, 'utf-8')
    )

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
        // Правильные метрики для GA4
        metrics: [
          { name: 'screenPageViews' }, // Просмотры страниц
          { name: 'totalUsers' }, // Общее количество пользователей
          { name: 'averageSessionDuration' }, // Средняя продолжительность сессии
          { name: 'bounceRate' }, // Показатель отказов
        ],
        // Правильные измерения для GA4
        dimensions: [{ name: 'pagePath' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 1000, // Ограничиваем количество результатов
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
        bounceRate: parseFloat(metrics[3].value) || 0,
      }
    })

    console.log(
      `✅ Получено ${Object.keys(stats).length} записей из Google Analytics`
    )

    // Сохраняем результат в кэш
    // global.gaCache[cacheKey] = stats
    console.log('💾 Данные сохранены в кэш')

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
