import fs from 'fs'
import path from 'path'

import { DEFAULT_ENCODE } from '../constants.js'
import { stripMd } from '../helpers/mdWorks.js'
import { parseMdFile } from '../helpers/mdWorks.js'
import { transliterate } from '../helpers/transliterate.js'

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
    // TODO: make real thumbnail
    thumbnail: frontmatter.cover,
  }
}

export function resolvePreview({ previewText, descrAsPreview, description }) {
  if (previewText) {
    return previewText
  } else if (descrAsPreview && description) {
    return description
  }
}

export function extractPreviewFromMd(mdContent) {
  const mdContentNoHeader = removeTitleFromMd(mdContent)
  const striped = stripMd(mdContentNoHeader)

  return striped.substring(0, 300)
}

function removeTitleFromMd(mdNoFrontmatter) {
  return mdNoFrontmatter.trim().replace(/^\#\s+.+/, '')
}
