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
