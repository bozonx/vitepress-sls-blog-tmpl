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
    // Используем console.warn для ошибок валидации, так как это важная информация
    console.warn(`Post ${url} validation failed: ${errors.join(', ')}`)
    return false
  }

  return true
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
  return config.userConfig.rssFormats || ['rss', 'atom', 'json']
}

export function makeAuthorForRss(config, frontmatter, siteUrl, localeIndex) {
  if (!frontmatter.authorId) return undefined

  const authors = config.userConfig.locales[localeIndex].themeConfig?.authors

  if (!Array.isArray(authors)) return

  const author = authors.find((item) => item.id === frontmatter.authorId)

  if (!author) return

  return {
    name: author.name,
    link: `${siteUrl}/${config.userConfig.themeConfig.authorsBaseUrl}/${author.id}/1`,
  }
}

// /**
//  * Проверяет, включен ли debug режим
//  *
//  * @param {Object} config - Конфигурация
//  * @returns {boolean} True если debug режим включен
//  */
// export function isDebugMode(config) {
//   return (
//     config.userConfig?.debug === true ||
//     config.userConfig?.themeConfig?.debug === true ||
//     process.env.NODE_ENV === 'development'
//   )
// }

// /**
//  * Выводит debug сообщение только в debug режиме
//  *
//  * @param {Object} config - Конфигурация
//  * @param {string} message - Сообщение для вывода
//  * @param {...any} args - Дополнительные аргументы
//  */
// export function debugLog(config, message, ...args) {
//   if (isDebugMode(config)) {
//     console.log(message, ...args)
//   }
// }

// export function resolveDescriptionForRss(fsrcDir, filePath) {
//   try {
//     // Читаем содержимое файла
//     const rawContent = fs.readFileSync(
//       path.join(siteConfig.srcDir, pageData.filePath),
//       DEFAULT_ENCODE
//     )
//     const { content } = parseMdFile(rawContent)

//     pageData.description = extractPreviewFromMd(content)
//   } catch (error) {
//     console.warn(
//       `Failed to read file for description: ${pageData.filePath}`,
//       error.message
//     )
//   }

//   return description
// }
