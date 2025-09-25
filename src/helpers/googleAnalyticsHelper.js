/**
 * Хелпер для работы с Google Analytics API Получает статистику просмотров
 * страниц для определения популярных постов Использует официальную библиотеку
 * googleapis
 */

import fs from 'fs/promises'
import path from 'path'
import { google } from 'googleapis'

// Кэш для хранения статистики GA
let gaStatsCache = null
let cacheTimestamp = null
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 часа в миллисекундах

/**
 * Загружает статистику из Google Analytics API
 *
 * @param {Object} config - Конфигурация GA
 * @returns {Promise<Object>} Статистика просмотров страниц
 */
export async function fetchGoogleAnalyticsStats(config) {
  const { gaConfig } = config

  if (!gaConfig || !gaConfig.propertyId || !gaConfig.credentialsPath) {
    console.warn(
      'Google Analytics не настроен, используется fallback сортировка'
    )
    return null
  }

  try {
    // Проверяем кэш
    if (
      gaStatsCache &&
      cacheTimestamp &&
      Date.now() - cacheTimestamp < CACHE_DURATION
    ) {
      console.log('Используем кэшированную статистику GA')
      return gaStatsCache
    }

    console.log('Загружаем статистику из Google Analytics...')

    // Пытаемся загрузить реальную статистику
    let stats = null

    // Если включены моковые данные, используем их
    if (gaConfig.useMockData) {
      console.log('Используем моковые данные GA (useMockData: true)')
      stats = await generateMockGAStats(config)
    } else {
      try {
        // Выбираем API в зависимости от версии GA
        if (gaConfig.version === 'ga4') {
          stats = await fetchGA4Stats(config)
        } else {
          stats = await fetchRealGAStats(config)
        }
      } catch (error) {
        console.warn(
          'Не удалось загрузить реальную статистику GA:',
          error.message
        )
        console.log('Используем моковые данные для демонстрации...')
        stats = await generateMockGAStats(config)
      }
    }

    // Сохраняем в кэш
    if (stats) {
      gaStatsCache = stats
      cacheTimestamp = Date.now()
    }

    return stats
  } catch (error) {
    console.error('Ошибка загрузки статистики GA:', error)
    return null
  }
}

/**
 * Загружает статистику из Google Analytics 4 (GA4)
 *
 * @param {Object} config - Конфигурация GA
 * @returns {Promise<Object>} Статистика GA4
 */
async function fetchGA4Stats(config) {
  const { gaConfig } = config

  // Загружаем учетные данные
  const credentials = JSON.parse(
    await fs.readFile(gaConfig.credentialsPath, 'utf-8')
  )

  // Создаем клиент для GA4 Data API
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })

  // Инициализируем Google Analytics Data API (GA4)
  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth })

  // Запрашиваем данные за указанный период
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

  // Обрабатываем ответ GA4
  return processGA4Response(response.data)
}

/**
 * Обрабатывает ответ от Google Analytics 4 API
 *
 * @param {Object} responseData - Данные ответа от GA4 API
 * @returns {Object} Обработанная статистика
 */
function processGA4Response(responseData) {
  const stats = {}

  if (!responseData.rows || responseData.rows.length === 0) {
    console.warn('Нет данных в ответе от Google Analytics 4')
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

  console.log(
    `Обработано ${Object.keys(stats).length} страниц из Google Analytics 4`
  )
  return stats
}

/**
 * Загружает реальную статистику из Google Analytics Universal Analytics
 *
 * @param {Object} config - Конфигурация GA
 * @returns {Promise<Object>} Статистика GA
 */
async function fetchRealGAStats(config) {
  const { gaConfig } = config

  // Загружаем учетные данные
  const credentials = JSON.parse(
    await fs.readFile(gaConfig.credentialsPath, 'utf-8')
  )

  // Создаем клиент для GA Reporting API
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })

  // Инициализируем Google Analytics Reporting API
  const analyticsreporting = google.analyticsreporting({ version: 'v4', auth })

  // Запрашиваем данные за последние 30 дней
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 30)

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

  // Обрабатываем ответ и возвращаем статистику
  return processGAResponse(response.data)
}

/**
 * Обрабатывает ответ от Google Analytics API
 *
 * @param {Object} responseData - Данные ответа от GA API
 * @returns {Object} Обработанная статистика
 */
function processGAResponse(responseData) {
  const stats = {}

  if (!responseData.reports || responseData.reports.length === 0) {
    console.warn('Нет данных в ответе от Google Analytics')
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

  console.log(
    `Обработано ${Object.keys(stats).length} страниц из Google Analytics`
  )
  return stats
}

/**
 * Генерирует моковые данные GA для демонстрации Используется когда реальный GA
 * API недоступен
 */
async function generateMockGAStats(config) {
  // Получаем список всех постов для генерации моковых данных
  const posts = await getAllPosts(config)

  const stats = {}
  posts.forEach((post, index) => {
    // Генерируем случайные просмотры (от 100 до 10000)
    const views = Math.floor(Math.random() * 9900) + 100
    stats[post.url] = {
      pageviews: views,
      uniquePageviews: Math.floor(views * 0.7), // ~70% уникальных просмотров
      avgTimeOnPage: Math.floor(Math.random() * 300) + 30, // 30-330 секунд
      bounceRate: Math.random() * 0.5 + 0.2, // 20-70%
    }
  })

  console.log(`Сгенерировано ${Object.keys(stats).length} моковых записей GA`)
  return stats
}

/** Получает все посты из всех локалей */
async function getAllPosts(config) {
  const posts = []

  // Получаем список локалей из конфигурации
  const locales = Object.keys(config.locales || { root: {} })

  for (const locale of locales) {
    try {
      const { loadPosts } = await import('../list-helpers/loadPosts.js')
      const localeDir = path.join(config.srcDir, locale)
      const localePosts = await loadPosts(localeDir)
      posts.push(...localePosts)
    } catch (error) {
      console.warn(`Не удалось загрузить посты для локали ${locale}:`, error)
    }
  }

  return posts
}

/**
 * Сортирует посты по статистике Google Analytics
 *
 * @param {Array} posts - Массив постов
 * @param {Object} gaStats - Статистика GA
 * @param {string} sortBy - Поле для сортировки ('pageviews', 'uniquePageviews',
 *   'avgTimeOnPage')
 * @returns {Array} Отсортированные посты
 */
export function sortPostsByGAStats(posts, gaStats, sortBy = 'pageviews') {
  if (!gaStats) {
    // Fallback: сортируем по дате (новые сначала)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  return posts
    .map((post) => ({
      ...post,
      gaStats: gaStats[post.url] || {
        pageviews: 0,
        uniquePageviews: 0,
        avgTimeOnPage: 0,
        bounceRate: 1,
      },
    }))
    .sort((a, b) => {
      const aValue = a.gaStats[sortBy] || 0
      const bValue = b.gaStats[sortBy] || 0

      // Для bounceRate сортируем по возрастанию (меньше = лучше)
      if (sortBy === 'bounceRate') {
        return aValue - bValue
      }

      // Для остальных метрик сортируем по убыванию (больше = лучше)
      return bValue - aValue
    })
}

/**
 * Получает топ постов по статистике GA
 *
 * @param {Array} posts - Массив постов
 * @param {Object} gaStats - Статистика GA
 * @param {number} limit - Количество постов для возврата
 * @param {string} sortBy - Поле для сортировки
 * @returns {Array} Топ постов
 */
export function getTopPostsByGA(
  posts,
  gaStats,
  limit = 10,
  sortBy = 'pageviews'
) {
  const sortedPosts = sortPostsByGAStats(posts, gaStats, sortBy)
  return sortedPosts.slice(0, limit)
}

/**
 * Сохраняет статистику GA в файл для офлайн использования
 *
 * @param {Object} stats - Статистика GA
 * @param {string} filePath - Путь к файлу
 */
export async function saveGAStatsToFile(stats, filePath) {
  try {
    const data = { timestamp: Date.now(), stats }
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`Статистика GA сохранена в ${filePath}`)
  } catch (error) {
    console.error('Ошибка сохранения статистики GA:', error)
  }
}

/**
 * Загружает статистику GA из файла
 *
 * @param {string} filePath - Путь к файлу
 * @returns {Object | null} Статистика GA или null
 */
export async function loadGAStatsFromFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    const parsed = JSON.parse(data)

    // Проверяем актуальность данных (не старше 7 дней)
    const maxAge = 7 * 24 * 60 * 60 * 1000
    if (Date.now() - parsed.timestamp > maxAge) {
      console.warn('Файл статистики GA устарел')
      return null
    }

    return parsed.stats
  } catch (error) {
    console.warn('Не удалось загрузить статистику GA из файла:', error)
    return null
  }
}
