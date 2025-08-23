import fs from 'fs'
import path from 'path'

/** Утилиты для валидации RSS feed */

// Максимальная длина описания для RSS (стандарт)
const MAX_DESCRIPTION_LENGTH = 500

/**
 * Валидирует обязательные поля frontmatter для RSS
 *
 * @param {Object} frontmatter - Frontmatter поста
 * @param {string} url - URL поста для логирования
 * @returns {boolean} - True если валиден
 */
export function validatePostForRss(frontmatter, url) {
  const errors = []

  if (!frontmatter.title) {
    errors.push('missing title')
  }

  if (!frontmatter.date) {
    errors.push('missing date')
  } else {
    // Проверяем что дата валидна
    const date = new Date(frontmatter.date)
    if (isNaN(date.getTime())) {
      errors.push('invalid date format')
    } else {
      // Проверяем что дата не в будущем (с небольшим допуском)
      const now = new Date()
      const futureLimit = new Date(now.getTime() + 24 * 60 * 60 * 1000) // +1 день
      if (date > futureLimit) {
        errors.push('date is too far in the future')
      }
    }
  }

  if (errors.length > 0) {
    console.warn(`Post ${url} validation failed: ${errors.join(', ')}`)
    return false
  }

  return true
}

/**
 * Очищает HTML теги из текста для безопасного использования в RSS
 *
 * @param {string} text - Исходный текст
 * @returns {string} - Очищенный текст
 */
export function sanitizeTextForRss(text) {
  if (!text) return ''

  return text
    .replace(/<[^>]*>/g, '') // Удаляем HTML теги
    .replace(/&(?!amp;|lt;|gt;|quot;|#39;)/g, '&amp;') // Экранируем & только если это не уже экранированный символ
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .trim()
}

/**
 * Обрезает описание до максимальной длины для RSS
 *
 * @param {string} description - Исходное описание
 * @returns {string} - Обрезанное описание
 */
export function truncateDescriptionForRss(description) {
  if (!description) return ''

  const cleanDesc = sanitizeTextForRss(description)

  if (cleanDesc.length <= MAX_DESCRIPTION_LENGTH) {
    return cleanDesc
  }

  // Обрезаем по последнему пробелу чтобы не разрывать слова
  const truncated = cleanDesc.substring(0, MAX_DESCRIPTION_LENGTH)
  const lastSpace = truncated.lastIndexOf(' ')

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...'
}

/**
 * Создает уникальный GUID для поста
 *
 * @param {string} hostname - Хост сайта
 * @param {string} url - URL поста
 * @param {string} date - Дата поста
 * @returns {string} - Уникальный GUID
 */
export function createPostGuid(hostname, url, date) {
  // Используем URL и дату для создания более уникального GUID
  const dateStr = date ? new Date(date).toISOString().split('T')[0] : ''
  return `${hostname}${url}${dateStr ? `#${dateStr}` : ''}`
}

/**
 * Форматирует теги для использования в RSS категориях
 *
 * @param {Array} tags - Массив тегов
 * @param {string} hostname - Хост сайта
 * @returns {Array} - Массив объектов категорий
 */
export function formatTagsForRss(tags, hostname) {
  if (!tags || !Array.isArray(tags)) return []

  return tags
    .filter((tag) => tag && typeof tag === 'string' && tag.trim()) // Фильтруем пустые теги
    .map((tag) => ({
      name: tag.trim(),
      domain: `${hostname}/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    }))
}

/**
 * Валидирует конфигурацию для генерации RSS
 *
 * @param {Object} config - Конфигурация
 * @returns {boolean} - True если конфигурация валидна
 */
export function validateRssConfig(config) {
  const errors = []

  if (!config.site?.locales) {
    errors.push('missing site.locales configuration')
  }

  if (!config.userConfig?.hostname) {
    errors.push('missing hostname configuration')
  }

  if (!config.outDir) {
    errors.push('missing outDir configuration')
  }

  if (errors.length > 0) {
    console.error('RSS configuration validation failed:', errors.join(', '))
    return false
  }

  return true
}

/** Общие утилиты для работы с форматами RSS */

/**
 * Возвращает информацию о формате RSS
 *
 * @param {string} format - Формат RSS
 * @returns {Object} Информация о формате
 */
export function getFormatInfo(format) {
  const formats = {
    rss: {
      mimeType: 'application/rss+xml',
      title: 'RSS Feed',
      extension: 'rss',
      generator: (feed) => feed.rss2(),
    },
    atom: {
      mimeType: 'application/atom+xml',
      title: 'Atom Feed',
      extension: 'atom',
      generator: (feed) => feed.atom1(),
    },
    json: {
      mimeType: 'application/feed+json',
      title: 'JSON Feed',
      extension: 'json',
      generator: (feed) => feed.json1(),
    },
  }

  return formats[format] || formats.rss
}

/**
 * Получает настройки форматов RSS из конфигурации
 *
 * @param {Object} config - Конфигурация
 * @returns {Array} Массив форматов RSS
 */
export function getRssFormats(config) {
  return config.userConfig.themeConfig?.rssFormats || ['rss', 'atom', 'json']
}

export function makeAuthorForRss(config, frontmatter, siteUrl, localeIndex) {
  if (!frontmatter.authorId) return undefined

  const authors = config.userConfig.locales[localeIndex].themeConfig?.authors

  if (!authors || !Array.isArray(authors)) {
    console.warn(
      `Authors configuration not found or invalid for post with authorId: ${frontmatter.authorId}`
    )
    return undefined
  }

  const author = authors.find((item) => item.id === frontmatter.authorId)

  if (!author) {
    console.warn(
      `Author with id "${frontmatter.authorId}" not found in authors configuration`
    )
    return undefined
  }

  return {
    name: author.name,
    link: `${siteUrl}/${localeIndex}${config.userConfig.authorBaseUrl}/${author.id}`,
  }
}
