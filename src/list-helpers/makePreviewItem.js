import fs from 'fs'
import path from 'path'

import { DEFAULT_ENCODE } from '../constants.js'
import { parseMdFile } from '../helpers/mdWorks.js'
import { transliterate } from '../helpers/transliterate.js'
import { getImageDimensions } from '../helpers/imageHelpers.js'
import { extractPreviewFromMd } from '../helpers/mdWorks.js'

export function makePreviewItem(filePath) {
  const relativePath = path.relative(
    path.resolve(filePath, '../../../'),
    filePath
  )

  const url = '/' + relativePath.replace(/\.md$/, '')
  const rawContent = fs.readFileSync(filePath, DEFAULT_ENCODE)
  const { frontmatter, content } = parseMdFile(rawContent)
  let preview = resolvePreview(frontmatter, content)

  if (!preview) preview = extractPreviewFromMd(content)

  // Получаем размеры изображения если оно есть
  let thumbnailDimensions = null
  if (frontmatter.cover) {
    const baseDir = path.resolve(filePath, '../../../')
    thumbnailDimensions = getImageDimensions(frontmatter.cover, baseDir)
  }

  return {
    url,
    date: frontmatter.date,
    authorId: frontmatter.authorId,
    title: frontmatter.title,
    tags: [...(frontmatter.tags || [])].map((item) => ({
      name: item,
      slug: transliterate(item),
    })),
    preview,
    thumbnail: frontmatter.cover,
    thumbnailHeight: thumbnailDimensions?.height || frontmatter.thumbnailHeight,
    thumbnailWidth: thumbnailDimensions?.width || frontmatter.thumbnailWidth,
  }
}

export function resolvePreview({ previewText, descrAsPreview, description }) {
  if (previewText) {
    return previewText
  } else if (descrAsPreview && description) {
    return description
  }
}
