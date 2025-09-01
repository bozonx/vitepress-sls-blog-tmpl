import path from 'path'

/**
 * Добавляет каноническую ссылку в head страницы если указан параметр canonical
 * в frontmatter. Каноническая ссылка помогает избежать дублированного контента
 * и указывает поисковикам на основную версию страницы
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function addCanonicalLink(pageData, { siteConfig }) {
  try {
    // Пропускаем корневые страницы и страницы без языкового префикса
    if (!pageData.filePath || pageData.filePath.indexOf('/') < 0) return

    // Проверяем наличие параметра canonical в frontmatter
    // canonical должен содержать URL для канонической ссылки
    const canonicalUrl = pageData.frontmatter.canonical
    if (!canonicalUrl || typeof canonicalUrl !== 'string') return

    // Проверяем, что URL валидный
    try {
      new URL(canonicalUrl)
    } catch (error) {
      console.warn(
        `Invalid canonical URL in ${pageData.filePath}: ${canonicalUrl}`
      )
      return
    }

    // Инициализируем head если его нет
    if (!pageData.frontmatter.head) {
      pageData.frontmatter.head = []
    }

    // Добавляем каноническую ссылку с указанным URL
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
