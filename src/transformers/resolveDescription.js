import fs from 'fs'
import path from 'path'

import { DEFAULT_ENCODE } from '../constants.js'
import { isPost, isPage } from '../helpers/helpers.js'
import { makeDescriptionFromMd } from '../helpers/mdWorks.js'

/**
 * If description = "" in frontmatter, set description from content for posts
 * and pages
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function resolveDescription(pageData, { siteConfig }) {
  if (!isPost(pageData.frontmatter) && !isPage(pageData.frontmatter)) return

  if (
    typeof pageData.frontmatter.description !== 'string' ||
    pageData.frontmatter.description.trim() !== ''
  )
    return

  try {
    // Читаем содержимое файла
    const rawContent = fs.readFileSync(
      path.join(siteConfig.srcDir, pageData.filePath),
      DEFAULT_ENCODE
    )

    pageData.description = makeDescriptionFromMd(rawContent)
  } catch (error) {
    console.warn(
      `Failed to read file for description: ${pageData.filePath}`,
      error.message
    )
  }
}
