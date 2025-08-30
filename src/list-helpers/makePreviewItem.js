import fs from 'fs'
import path from 'path'
import { smartTruncate } from 'squidlet-lib'

import { DEFAULT_ENCODE } from '../constants.js'
import { stripMd } from '../helpers/mdWorks.js'
import { parseMdFile } from '../helpers/mdWorks.js'
import { transliterate } from '../helpers/transliterate.js'
import { getImageSize } from '../helpers/imageHelpers.js'

/**
 * Получает размеры изображения из файла
 *
 * @param {string} imagePath - Путь к изображению
 * @param {string} baseDir - Базовая директория для поиска изображения
 * @returns {{ width: number; height: number } | null} Размеры изображения или
 *   null
 */
function getThumbnailDimensions(imagePath, baseDir) {
  if (!imagePath) return null

  try {
    // Полный путь к файлу изображения
    const fullImagePath = path.join(baseDir, 'public', imagePath)

    // Проверяем существование файла
    if (!fs.existsSync(fullImagePath)) {
      console.warn(`Thumbnail file not found: ${fullImagePath}`)
      return null
    }

    // Читаем файл в буфер и передаем буфер в getImageSize
    const buffer = fs.readFileSync(fullImagePath)

    // Проверяем, что буфер не пустой
    if (!buffer || buffer.length === 0) {
      console.warn(`Empty buffer for thumbnail file: ${fullImagePath}`)
      return null
    }

    const dimensions = getImageSize(buffer)

    // Проверяем, что размеры валидны
    if (!dimensions || !dimensions.width || !dimensions.height) {
      console.warn(`Invalid thumbnail dimensions for ${imagePath}`)
      return null
    }

    return { width: dimensions.width, height: dimensions.height }
  } catch (error) {
    console.warn(
      `Failed to get thumbnail dimensions for ${imagePath}:`,
      error.message
    )
    return null
  }
}

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
    thumbnailDimensions = getThumbnailDimensions(frontmatter.cover, baseDir)
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

export function extractPreviewFromMd(mdContent) {
  const mdContentNoHeader = removeTitleFromMd(mdContent)
  const striped = stripMd(mdContentNoHeader)

  return smartTruncate(striped, 300, { respectWords: true })
}

function removeTitleFromMd(mdNoFrontmatter) {
  return mdNoFrontmatter.trim().replace(/^\#\s+.+/, '')
}
