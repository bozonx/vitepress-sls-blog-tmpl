import fs from 'fs'
import path from 'path'

import { DEFAULT_ENCODE } from '../constants.js'
import { parseMdFile } from '../helpers/mdWorks.js'
import { extractPreviewFromMd } from '../list-helpers/makePreviewItem.js'

/**
 * If description = "" in frontmatter, set description from content
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function resolveDescription(pageData, { siteConfig }) {
  // Пропускаем корневой index.md
  if (pageData.filePath.indexOf('/') < 0) return

  const frontmatterDescription = pageData.frontmatter.description

  if (
    typeof frontmatterDescription === 'string' &&
    frontmatterDescription.trim() === ''
  ) {
    try {
      // Читаем содержимое файла
      const rawContent = fs.readFileSync(
        path.join(siteConfig.srcDir, pageData.filePath),
        DEFAULT_ENCODE
      )
      const { content } = parseMdFile(rawContent)

      pageData.description = extractPreviewFromMd(content)
    } catch (error) {
      console.warn(
        `Failed to read file for description: ${pageData.filePath}`,
        error.message
      )
    }
  }
  // Если описание есть и не пустое - оставляем как есть
}
