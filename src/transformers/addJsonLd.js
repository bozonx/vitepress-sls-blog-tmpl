import fs from 'fs'
import path from 'path'

import { DEFAULT_ENCODE } from '../constants.js'
import { isHomePage, isPage, isPost } from '../helpers/helpers.js'
import { parseMdFile } from '../helpers/mdWorks.js'
import {
  extractPreviewFromMd,
  resolvePreview,
} from '../page-helpers/makePreviewItem.js'

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
 * Создает JSON-LD структуру для веб-сайта
 *
 * @param {Object} params - Параметры для создания структуры
 * @returns {Object} JSON-LD объект
 */
function createWebsiteJsonLd({ hostname, siteName, description, pageUrl }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    description: description,
    url: hostname,
    mainEntity: { '@type': 'WebPage', '@id': pageUrl },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${hostname}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Создает JSON-LD структуру для статьи
 *
 * @param {Object} params - Параметры для создания структуры
 * @returns {Object} JSON-LD объект
 */
function createArticleJsonLd({
  title,
  description,
  pageUrl,
  author,
  date,
  updated,
  cover,
  hostname,
  tags,
  siteName,
}) {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: pageUrl,
    datePublished: date,
    publisher: { '@type': 'Organization', name: siteName, url: hostname },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  }

  // Добавляем автора если есть
  if (author) {
    article.author = { '@type': 'Person', name: author }
  }

  // Добавляем время обновления если есть
  if (updated) {
    article.dateModified = updated
  }

  // Добавляем изображение если есть
  if (cover) {
    article.image = {
      '@type': 'ImageObject',
      url: cover.startsWith('http') ? cover : `${hostname}${cover}`,
    }
  }

  // Добавляем ключевые слова из тегов
  if (tags && tags.length > 0) {
    article.keywords = tags.map((tag) => tag.name).join(', ')
  }

  // Добавляем тип статьи (BlogPosting для блог-постов)
  article['@type'] = 'BlogPosting'

  return article
}

/**
 * Создает JSON-LD структуру для страницы
 *
 * @param {Object} params - Параметры для создания структуры
 * @returns {Object} JSON-LD объект
 */
function createWebPageJsonLd({
  title,
  description,
  pageUrl,
  hostname,
  siteName,
  cover,
}) {
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: pageUrl,
    publisher: { '@type': 'Organization', name: siteName, url: hostname },
  }

  // Добавляем изображение если есть
  if (cover) {
    webPage.image = {
      '@type': 'ImageObject',
      url: cover.startsWith('http') ? cover : `${hostname}${cover}`,
    }
  }

  return webPage
}

/**
 * Добавляет JSON-LD структурированные данные на страницу
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function addJsonLd(pageData, { siteConfig }) {
  // Пропускаем корневой index.md
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
  const cover = pageData.frontmatter.cover
  const pageUrl = generatePageUrl(hostname, pageData.filePath)

  // Получаем описание
  let description = pageData.frontmatter.description

  if (isHome) {
    description = langConfig.description
  } else if (isArticle || isPage(pageData.frontmatter)) {
    description = resolvePreview(pageData.frontmatter)

    if (!description) {
      try {
        const rawContent = fs.readFileSync(
          path.join(siteConfig.srcDir, pageData.filePath),
          DEFAULT_ENCODE
        )
        const { content } = parseMdFile(rawContent)
        description = extractPreviewFromMd(content)
      } catch (error) {
        console.warn(
          `Failed to read file for JSON-LD description: ${pageData.filePath}`,
          error.message
        )
      }
    }
  }

  // Создаем соответствующую JSON-LD структуру
  let jsonLdData

  if (isHome) {
    jsonLdData = createWebsiteJsonLd({
      hostname,
      siteName,
      description,
      pageUrl,
    })
  } else if (isArticle) {
    jsonLdData = createArticleJsonLd({
      title,
      description,
      pageUrl,
      author,
      date: pageData.frontmatter.date,
      updated: pageData.frontmatter.updated,
      cover,
      hostname,
      tags: pageData.frontmatter.tags,
      siteName,
    })
  } else {
    jsonLdData = createWebPageJsonLd({
      title,
      description,
      pageUrl,
      hostname,
      siteName,
      cover,
    })
  }

  // Инициализируем head если его нет
  pageData.frontmatter.head ??= []

  // Добавляем JSON-LD скрипт
  pageData.frontmatter.head.push([
    'script',
    { type: 'application/ld+json' },
    JSON.stringify(jsonLdData, null, 2),
  ])
}
