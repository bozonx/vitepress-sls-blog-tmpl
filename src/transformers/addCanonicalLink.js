import { generatePageUrlPath } from '../helpers/helpers.js'

/**
 * Добавляет каноническую ссылку в head страницы если указан параметр canonical
 * в frontmatter. Если указан self то генерируется URL текущей страницы
 *
 * @param {Object} context - { page, head, pageData, siteConfig }
 */
export function addCanonicalLink({ page, head, pageData, siteConfig }) {
  // Пропускаем корневые страницы и страницы без языкового префикса
  if (!page || page.indexOf('/') < 0) {
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
      canonicalUrl = `${hostname}/${generatePageUrlPath(page)}`
    } else if (typeof canonicalValue === 'string') {
      // Проверяем, что URL валидный
      try {
        new URL(canonicalValue)
        canonicalUrl = canonicalValue
      } catch (error) {
        console.warn(`Invalid canonical URL in ${page}: ${canonicalValue}`)
        return
      }
    } else {
      // Неподдерживаемый тип значения
      return
    }

    // Добавляем каноническую ссылку
    head.push(['link', { rel: 'canonical', href: canonicalUrl }])
  } catch (error) {
    console.error(`Error adding canonical link for ${page}:`, error.message)
  }
}
