/**
 * Хелпер для получения статистики аналитики во время сборки Генерирует
 * статический JSON файл с популярными постами
 */

import fs from 'fs/promises'
import path from 'path'
import { google } from 'googleapis'

/**
 * Генерирует файл с популярными постами во время сборки
 *
 * @param {Object} config - Конфигурация VitePress
 * @returns {Promise<void>}
 */
export async function generatePopularPostsAtBuildTime(config) {
  const { userConfig } = config
  const analyticsConfig = userConfig.themeConfig?.analytics

  if (!analyticsConfig?.enabled) {
    console.log(
      '📊 Аналитика отключена, пропускаем генерацию популярных постов'
    )
    return
  }

  console.log('📊 Генерируем популярные посты во время сборки...')

  try {
    // Получаем статистику
    const stats = await fetchAnalyticsStatsAtBuildTime(config)

    if (!stats || Object.keys(stats).length === 0) {
      console.warn('⚠️ Не удалось получить статистику, используем fallback')
      return
    }

    // Загружаем все посты
    const allPosts = await getAllPostsAtBuildTime(config)

    // Сортируем посты по статистике
    const popularPosts = sortPostsByAnalyticsAtBuildTime(
      allPosts,
      stats,
      analyticsConfig.sortBy || 'pageviews',
      analyticsConfig.popularPostsCount || 10
    )

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

    // Сохраняем в публичную директорию
    const outputPath = path.join(config.outDir, 'popular-posts.json')
    await fs.writeFile(outputPath, JSON.stringify(data, null, 2), 'utf-8')

    console.log(`✅ Популярные посты сохранены в ${outputPath}`)
    console.log(
      `📈 Обработано ${popularPosts.length} популярных постов из ${allPosts.length} общих`
    )
  } catch (error) {
    console.error('❌ Ошибка генерации популярных постов:', error)
  }
}

/** Получает статистику аналитики во время сборки */
async function fetchAnalyticsStatsAtBuildTime(config) {
  const { userConfig } = config
  const analyticsConfig = userConfig.themeConfig?.analytics

  switch (analyticsConfig.type) {
    case 'google':
      return await fetchGoogleAnalyticsAtBuildTime(analyticsConfig)
    case 'mock':
    default:
      return await generateMockAnalyticsAtBuildTime(config)
  }
}

/** Получает статистику из Google Analytics во время сборки */
async function fetchGoogleAnalyticsAtBuildTime(analyticsConfig) {
  const gaConfig = analyticsConfig.google

  if (!gaConfig.enabled || !gaConfig.propertyId || !gaConfig.credentialsPath) {
    throw new Error('Google Analytics не настроен')
  }

  console.log('🔍 Загружаем статистику из Google Analytics...')

  // Загружаем учетные данные
  const credentials = JSON.parse(
    await fs.readFile(gaConfig.credentialsPath, 'utf-8')
  )

  // Создаем клиент для GA API
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })

  if (gaConfig.version === 'ga4') {
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

    return processGA4ResponseAtBuildTime(response.data)
  } else {
    // Universal Analytics Reporting API
    const analyticsreporting = google.analyticsreporting({
      version: 'v4',
      auth,
    })
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - (gaConfig.dataPeriodDays || 30))

    const response = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId: gaConfig.propertyId,
            dateRanges: [
              {
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
              },
            ],
            metrics: [
              { expression: 'ga:pageviews' },
              { expression: 'ga:uniquePageviews' },
              { expression: 'ga:avgTimeOnPage' },
              { expression: 'ga:bounceRate' },
            ],
            dimensions: [{ name: 'ga:pagePath' }],
            orderBys: [{ fieldName: 'ga:pageviews', sortOrder: 'DESCENDING' }],
          },
        ],
      },
    })

    return processGAUAResponseAtBuildTime(response.data)
  }
}

/** Генерирует моковые данные во время сборки */
async function generateMockAnalyticsAtBuildTime(config) {
  console.log('🎭 Генерируем моковые данные аналитики...')

  const posts = await getAllPostsAtBuildTime(config)
  const stats = {}

  posts.forEach((post, index) => {
    // Генерируем более предсказуемые данные для сборки
    const baseViews = 100 + index * 50
    const views = baseViews + Math.floor(Math.random() * 100)

    stats[post.url] = {
      pageviews: views,
      uniquePageviews: Math.floor(views * 0.7),
      avgTimeOnPage: 120 + Math.floor(Math.random() * 180),
      bounceRate: 0.2 + Math.random() * 0.3,
    }
  })

  console.log(`🎭 Сгенерировано ${Object.keys(stats).length} моковых записей`)
  return stats
}

/** Получает все посты во время сборки */
async function getAllPostsAtBuildTime(config) {
  const posts = []
  const locales = Object.keys(config.locales || { root: {} })

  for (const locale of locales) {
    try {
      const { loadPosts } = await import('../list-helpers/loadPosts.js')
      const localeDir = path.join(config.srcDir, locale)
      const localePosts = await loadPosts(localeDir)
      posts.push(...localePosts)
    } catch (error) {
      console.warn(
        `⚠️ Не удалось загрузить посты для локали ${locale}:`,
        error.message
      )
    }
  }

  return posts
}

/** Сортирует посты по статистике во время сборки */
function sortPostsByAnalyticsAtBuildTime(posts, stats, sortBy, limit) {
  return posts
    .map((post) => ({
      ...post,
      analyticsStats: stats[post.url] || {
        pageviews: 0,
        uniquePageviews: 0,
        avgTimeOnPage: 0,
        bounceRate: 1,
      },
    }))
    .sort((a, b) => {
      const aValue = a.analyticsStats[sortBy] || 0
      const bValue = b.analyticsStats[sortBy] || 0

      // Для bounceRate сортируем по возрастанию (меньше = лучше)
      if (sortBy === 'bounceRate') {
        return aValue - bValue
      }

      // Для остальных метрик сортируем по убыванию (больше = лучше)
      return bValue - aValue
    })
    .slice(0, limit)
}

/** Обрабатывает ответ от GA4 API во время сборки */
function processGA4ResponseAtBuildTime(responseData) {
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

/** Обрабатывает ответ от Universal Analytics API во время сборки */
function processGAUAResponseAtBuildTime(responseData) {
  const stats = {}

  if (!responseData.reports || responseData.reports.length === 0) {
    console.warn('⚠️ Нет данных в ответе от Google Analytics')
    return stats
  }

  const report = responseData.reports[0]
  const rows = report.data?.rows || []

  rows.forEach((row) => {
    const pagePath = row.dimensions[0]
    const metrics = row.metrics[0].values

    stats[pagePath] = {
      pageviews: parseInt(metrics[0]) || 0,
      uniquePageviews: parseInt(metrics[1]) || 0,
      avgTimeOnPage: parseFloat(metrics[2]) || 0,
      bounceRate: parseFloat(metrics[3]) || 0,
    }
  })

  return stats
}
