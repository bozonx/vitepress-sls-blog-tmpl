import { generatePageUrlPath } from '../helpers/helpers.js'

/**
 * Добавляет каноническую ссылку в head страницы если указан параметр canonical
 * в frontmatter. Если указан self то генерируется URL текущей страницы
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function addCanonicalLink(pageData, { siteConfig }) {
  // Пропускаем корневые страницы и страницы без языкового префикса
  if (!pageData.relativePath || pageData.filePath.indexOf('/') < 0) {
    return
  }

  // Проверяем наличие параметра canonical в frontmatter
  const canonicalValue = pageData.frontmatter.canonical

  if (!canonicalValue) return

  try {
    let canonicalUrl = null

    // Проверяем специальные значения для ссылки на саму страницу
    if (canonicalValue === 'self') {
      const hostname = siteConfig.userConfig.hostname

      if (!hostname) {
        console.warn(
          'Canonical link not added: hostname not configured in siteConfig'
        )
        return
      }
      // Генерируем URL для текущей страницы
      canonicalUrl = `${hostname}/${generatePageUrlPath(pageData.relativePath)}`
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
 * Генерирует полный URL для текущей страницы
 *
 * @param {string} hostname - Хост сайта
 * @param {string} filePath - Путь к файлу
 * @returns {string | null} Полный URL или null если не удалось сгенерировать
 */
function generatePageUrl(pageData, siteConfig) {}
