import fs from 'fs/promises'
import { google } from 'googleapis'

export async function mergeWithAnalytics(localeIndex, posts, config) {
  const popularPostsCfg = config.site.themeConfig.popularPosts
  const gaCfg = config.site.themeConfig.googleAnalytics

  // Валидация конфигурации
  if (
    !popularPostsCfg?.enabled ||
    !gaCfg?.propertyId ||
    !gaCfg?.credentialsPath
  ) {
    console.log('⚠️ Google Analytics не настроен или отключен')
    return posts
  }

  try {
    // Получаем статистику из Google Analytics
    const stats = await fetchGoogleAnalytics(popularPostsCfg, gaCfg)

    if (!stats || Object.keys(stats).length === 0) {
      console.log('⚠️ Нет данных из Google Analytics')
      return posts
    }

    // Объединяем посты со статистикой
    const postsWithStats = posts.map((post) => {
      const postPath = post.url || post.relativePath
      const analyticsData = stats[postPath] || {}

      return { ...post, analyticsStats: analyticsData }
    })

    // Сортируем по выбранной метрике
    const sortedPosts = postsWithStats.sort((a, b) => {
      const metric = popularPostsCfg.sortBy || 'pageviews'
      const aValue = a.analyticsStats?.[metric] || 0
      const bValue = b.analyticsStats?.[metric] || 0
      return bValue - aValue
    })

    console.log(`✅ Обработано ${postsWithStats.length} постов с аналитикой`)

    return sortedPosts
  } catch (error) {
    console.error(
      '❌ Ошибка при загрузке данных из Google Analytics:',
      error.message
    )

    return posts
  }
}

async function fetchGoogleAnalytics(popularPostsCfg, gaCfg) {
  console.log('🔍 Загружаем статистику из Google Analytics...')

  try {
    // Загружаем учетные данные
    const credentials = JSON.parse(
      await fs.readFile(gaCfg.credentialsPath, 'utf-8')
    )

    // Создаем клиент для GA API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    })

    // GA4 Data API
    const analyticsdata = google.analyticsdata({ version: 'v1beta', auth })
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
          { name: 'screenPageViews' },
          { name: 'totalUsers' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
        ],
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
