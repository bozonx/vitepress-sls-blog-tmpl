import fs from 'fs'
import path from 'path'

import { DEFAULT_ENCODE } from '../constants.js'
import { isHomePage, isPage, isPost } from '../helpers/helpers.js'
import { parseMdFile } from '../helpers/mdWorks.js'
import {
  extractPreviewFromMd,
  resolvePreview,
} from '../list-helpers/makePreviewItem.js'
import { getImageSize } from '../helpers/imageHelpers.js'

// Используем image-size пакет для получения размеров изображений
/**
 * Обрезает описание до рекомендуемой длины для OG тегов
 *
 * @param {string} description - Исходное описание
 * @param {number} maxLength - Максимальная длина (по умолчанию 160)
 * @returns {string} Обрезанное описание
 */
function truncateDescription(description, maxLength = 160) {
  if (!description || description.length <= maxLength) {
    return description
  }

  // Обрезаем до последнего полного слова
  const truncated = description.substring(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...'
  }

  return truncated + '...'
}

/**
 * Генерирует полный URL для страницы
 *
 * @param {string} hostname - Хост сайта
 * @param {string} filePath - Путь к файлу
 * @returns {string} Полный URL
 */
function generatePageUrl(hostname, filePath) {
  if (!hostname || !filePath) return null

  // Убираем расширение файла
  const fileExtension = path.extname(filePath)
  const urlPath = filePath.substring(0, filePath.length - fileExtension.length)

  // Убираем индекс из пути
  const cleanPath = urlPath.replace(/\/index$/, '')

  return `${hostname}/${cleanPath}`
}

/**
 * Получает размеры изображения из файла
 *
 * @param {string} imagePath - Путь к изображению
 * @param {string} srcDir - Директория исходников
 * @returns {{ width: number; height: number } | null} Размеры изображения или
 *   null
 */
function getImageDimensions(imagePath, srcDir) {
  if (!imagePath) return null

  try {
    // Полный путь к файлу изображения
    const fullImagePath = path.join(srcDir, 'public', imagePath)

    // Проверяем существование файла
    if (!fs.existsSync(fullImagePath)) {
      console.warn(`Image file not found: ${fullImagePath}`)
      return null
    }

    // Читаем файл в буфер и передаем буфер в getImageSize
    const buffer = fs.readFileSync(fullImagePath)

    // Проверяем, что буфер не пустой
    if (!buffer || buffer.length === 0) {
      console.warn(`Empty buffer for image file: ${fullImagePath}`)
      return null
    }

    const dimensions = getImageSize(buffer)

    // Проверяем, что размеры валидны
    if (!dimensions || !dimensions.width || !dimensions.height) {
      console.warn(`Invalid image dimensions for ${imagePath}`)
      return null
    }

    return { width: dimensions.width, height: dimensions.height }
  } catch (error) {
    console.warn(
      `Failed to get image dimensions for ${imagePath}:`,
      error.message
    )
    return null
  }
}

/** Add OpenGraph metatags to the page */
export function addOgMetaTags(pageData, { siteConfig }) {
  // skip root index.md
  if (pageData.filePath.indexOf('/') < 0) return

  const hostname = siteConfig.userConfig.hostname
  const langIndex = pageData.filePath.split('/')[0]
  const langConfig = siteConfig.site.locales[langIndex]
  const isHome = isHomePage(pageData.frontmatter)
  const isArticle = isPost(pageData.frontmatter)
  const siteName = langConfig.title
  const title = isHome ? siteName : pageData.title
  const author =
    pageData.frontmatter.authorId &&
    langConfig.themeConfig.authors?.find(
      (item) => item.id === pageData.frontmatter.authorId
    )?.name
  const img =
    pageData.frontmatter.cover && hostname + pageData.frontmatter.cover

  // Получаем размеры изображения если оно есть
  let imageDimensions = null
  if (pageData.frontmatter.cover) {
    imageDimensions = getImageDimensions(
      pageData.frontmatter.cover,
      siteConfig.srcDir
    )
  }

  // Генерируем URL страницы
  const pageUrl = generatePageUrl(hostname, pageData.filePath)

  let descr = pageData.frontmatter.description

  if (isHome) {
    // for home page get the main description
    descr = langConfig.description
  } else if (isArticle || isPage(pageData.frontmatter)) {
    // means post or page
    descr = resolvePreview(pageData.frontmatter)

    if (!descr) {
      try {
        const rawContent = fs.readFileSync(
          path.join(siteConfig.srcDir, pageData.filePath),
          DEFAULT_ENCODE
        )
        const { content } = parseMdFile(rawContent)

        descr = extractPreviewFromMd(content)
      } catch (error) {
        console.warn(
          `Failed to read file for OG description: ${pageData.filePath}`,
          error.message
        )
      }
    }
  }

  // Обрезаем описание до рекомендуемой длины
  descr = truncateDescription(descr)

  pageData.frontmatter.head ??= []

  // Базовые обязательные OpenGraph теги
  pageData.frontmatter.head.push([
    'meta',
    { property: 'og:site_name', content: siteName },
  ])

  pageData.frontmatter.head.push([
    'meta',
    { property: 'og:title', content: title },
  ])

  descr &&
    pageData.frontmatter.head.push([
      'meta',
      { property: 'og:description', content: descr },
    ])

  // URL страницы (обязательный тег)
  pageUrl &&
    pageData.frontmatter.head.push([
      'meta',
      { property: 'og:url', content: pageUrl },
    ])

  // Локаль для многоязычных сайтов
  pageData.frontmatter.head.push([
    'meta',
    { property: 'og:locale', content: langIndex },
  ])

  // Тип контента
  const ogType = isArticle ? 'article' : 'website'
  pageData.frontmatter.head.push([
    'meta',
    { property: 'og:type', content: ogType },
  ])

  if (isArticle) {
    // Дополнительные теги для статей
    pageData.frontmatter.head.push([
      'meta',
      {
        property: 'article:published_time',
        content: pageData.frontmatter.date,
      },
    ])

    // Добавляем время модификации если есть
    pageData.frontmatter.updated &&
      pageData.frontmatter.head.push([
        'meta',
        {
          property: 'article:modified_time',
          content: pageData.frontmatter.updated,
        },
      ])

    author &&
      pageData.frontmatter.head.push([
        'meta',
        { property: 'article:author', content: author },
      ])

    // Теги статьи
    ;(pageData.frontmatter.tags || []).forEach((tag) => {
      pageData.frontmatter.head.push([
        'meta',
        { property: 'article:tag', content: tag.name },
      ])
    })
  }

  // Изображение
  if (img) {
    pageData.frontmatter.head.push([
      'meta',
      { property: 'og:image', content: img },
    ])

    // Размеры изображения (приоритет автоматически полученным размерам)
    const imageWidth = imageDimensions?.width || pageData.frontmatter.coverWidth
    const imageHeight =
      imageDimensions?.height || pageData.frontmatter.coverHeight

    if (imageWidth) {
      pageData.frontmatter.head.push([
        'meta',
        { property: 'og:image:width', content: imageWidth.toString() },
      ])
    }

    if (imageHeight) {
      pageData.frontmatter.head.push([
        'meta',
        { property: 'og:image:height', content: imageHeight.toString() },
      ])
    }

    // Альтернативный текст для изображения
    pageData.frontmatter.coverAlt &&
      pageData.frontmatter.head.push([
        'meta',
        { property: 'og:image:alt', content: pageData.frontmatter.coverAlt },
      ])
  }

  // Twitter Card теги
  const twitterCardType = img ? 'summary_large_image' : 'summary'
  pageData.frontmatter.head.push([
    'meta',
    { name: 'twitter:card', content: twitterCardType },
  ])

  pageData.frontmatter.head.push([
    'meta',
    { name: 'twitter:title', content: title },
  ])

  descr &&
    pageData.frontmatter.head.push([
      'meta',
      { name: 'twitter:description', content: descr },
    ])

  img &&
    pageData.frontmatter.head.push([
      'meta',
      { name: 'twitter:image', content: img },
    ])

  // Twitter Creator (если есть автор)
  author &&
    pageData.frontmatter.head.push([
      'meta',
      { name: 'twitter:creator', content: author },
    ])
}
