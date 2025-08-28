import { extractPreviewFromMd } from '../list-helpers/makePreviewItem.js'

/**
 * Разрешает описание для страницы
 *
 * - Если описание пустое или отсутствует в frontmatter, устанавливает описание из
 *   содержимого страницы через extractPreviewFromMd
 * - Если описание есть в frontmatter, оставляет его как есть
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function resolveDescription(pageData, { siteConfig }) {
  // Пропускаем корневой index.md
  if (pageData.filePath.indexOf('/') < 0) return

  // Проверяем frontmatter
  const frontmatterDescription = pageData.frontmatter.description

  if (
    typeof frontmatterDescription === 'string' &&
    frontmatterDescription.trim() === ''
  ) {
    pageData.frontmatter.description = extractPreviewFromMd(pageData.content)
  }
  // Если описание есть и не пустое - оставляем как есть
}
