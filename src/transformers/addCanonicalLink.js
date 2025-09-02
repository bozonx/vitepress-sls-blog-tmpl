import path from 'path'

/**
 * Добавляет каноническую ссылку в head страницы если указан параметр canonical
 * в frontmatter. Если указан self то генерируется URL текущей страницы
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function addCanonicalLink(pageData, { siteConfig }) {
  // Пропускаем корневые страницы и страницы без языкового префикса
  if (!pageData.filePath || pageData.filePath.indexOf('/') < 0) {
    return
  }

  // TODO: use relativePath

  try {
    // Проверяем наличие параметра canonical в frontmatter
    const canonicalValue = pageData.frontmatter.canonical
    if (!canonicalValue) return

    let canonicalUrl = null

    // Проверяем специальные значения для ссылки на саму страницу
    if (canonicalValue === 'self' || canonicalValue === 's') {
      // Генерируем URL для текущей страницы
      const hostname = siteConfig.userConfig.hostname
      if (!hostname) {
        console.warn(
          'Canonical link not added: hostname not configured in siteConfig'
        )
        return
      }
      canonicalUrl = generatePageUrl(hostname, pageData.filePath)

      if (!canonicalUrl) {
        console.warn(
          `Failed to generate canonical URL for: ${pageData.filePath}`
        )
        return
      }
    } else if (typeof canonicalValue === 'string') {
      // Проверяем, что URL валидный
      try {
        new URL(canonicalValue)
        canonicalUrl = canonicalValue
      } catch (error) {
        console.warn(
          `Invalid canonical URL in ${pageData.filePath}: ${canonicalValue}`
        )
        return
      }
    } else {
      // Неподдерживаемый тип значения
      return
    }

    // Инициализируем head если его нет
    if (!pageData.frontmatter.head) {
      pageData.frontmatter.head = []
    }

    // Добавляем каноническую ссылку
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl },
    ])
  } catch (error) {
    console.error(
      `Error adding canonical link for ${pageData.filePath}:`,
      error.message
    )
  }
}

/**
 * Генерирует полный URL для страницы
 *
 * @param {string} hostname - Хост сайта
 * @param {string} filePath - Путь к файлу
 * @returns {string | null} Полный URL или null если не удалось сгенерировать
 */
function generatePageUrl(hostname, filePath) {
  if (!hostname || !filePath) return null

  try {
    // Убираем расширение файла
    const fileExtension = path.extname(filePath)
    const urlPath = filePath.substring(
      0,
      filePath.length - fileExtension.length
    )

    // Убираем индекс из пути
    const cleanPath = urlPath.replace(/\/index$/, '')

    return `${hostname}/${cleanPath}`
  } catch (error) {
    console.error('Error generating page URL:', error.message)
    return null
  }
}
