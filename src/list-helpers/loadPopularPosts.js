import fs from 'fs/promises'
import { google } from 'googleapis'

export async function mergeWithAnalytics(localeIndex, posts, config) {
  const popularPostsCfg = config.site.themeConfig.popularPosts
  const gaCfg = config.site.themeConfig.googleAnalytics

  // TODO: validate
  if (!popularPostsCfg?.enabled || !gaCfg) {
    return posts
  }

  // Получаем статистику
  const stats = await fetchGoogleAnalytics(popularPostsCfg, gaCfg)

  if (!stats || Object.keys(stats).length === 0) {
    return posts
  }

  // Создаем данные для сохранения
  const data = {
    generatedAt: new Date().toISOString(),
    source: analyticsConfig.type || 'unknown',
    totalPosts: allPosts.length,
    popularPostsCount: popularPosts.length,
    posts: popularPosts.map((post) => ({
      url: post.url,
      title: post.title,
      date: post.date,
      authorId: post.authorId,
      tags: post.tags,
      preview: post.preview,
      thumbnail: post.thumbnail,
      cover: post.cover,
      coverHeight: post.coverHeight,
      coverWidth: post.coverWidth,
      analytics: post.analyticsStats,
    })),
  }

  return posts
}

async function fetchGoogleAnalytics(popularPostsCfg, gaCfg) {
  console.log('🔍 Загружаем статистику из Google Analytics...')

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
  startDate.setDate(startDate.getDate() - (gaConfig.dataPeriodDays || 30))

  const response = await analyticsdata.properties.runReport({
    property: `properties/${gaConfig.propertyId}`,
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
    },
  })

  const stats = {}

  if (!responseData.rows || responseData.rows.length === 0) {
    console.warn('⚠️ Нет данных в ответе от Google Analytics 4')
    return stats
  }

  responseData.rows.forEach((row) => {
    const pagePath = row.dimensionValues[0].value
    const metrics = row.metricValues

    stats[pagePath] = {
      pageviews: parseInt(metrics[0].value) || 0,
      uniquePageviews: parseInt(metrics[1].value) || 0,
      avgTimeOnPage: parseFloat(metrics[2].value) || 0,
      bounceRate: parseFloat(metrics[3].value) || 0,
    }
  })

  return stats
}
