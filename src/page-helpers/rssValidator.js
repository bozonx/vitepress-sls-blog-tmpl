import fs from 'fs'
import path from 'path'

/** Утилиты для валидации RSS feed */

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
    .replace(/&/g, '&amp;') // Экранируем специальные символы
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .trim()
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
  // Используем URL как основу для GUID
  return `${hostname}${url}`
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

  return tags.map((tag) => ({
    name: tag,
    domain: `${hostname}/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
  }))
}

/**
 * Проверяет существование директории и создает если нужно
 *
 * @param {string} dirPath - Путь к директории
 */
export function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
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
