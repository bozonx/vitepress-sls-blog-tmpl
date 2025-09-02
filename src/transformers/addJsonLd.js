import fs from 'fs'
import path from 'path'

import { DEFAULT_ENCODE, ROOT_LANG } from '../constants.js'
import { isHomePage, isPage, isPost } from '../helpers/helpers.js'
import { parseMdFile } from '../helpers/mdWorks.js'
import {
  extractPreviewFromMd,
  resolvePreview,
} from '../list-helpers/makePreviewItem.js'

/**
 * Генерирует полный URL для страницы
 *
 * @param {string} hostname - Хост сайта
 * @param {string} filePath - Путь к файлу
 * @returns {string} Полный URL
 */
function generatePageUrl(hostname, filePath) {
  if (!hostname || !filePath) return null

  // TODO: use relativePath

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
function createWebsiteJsonLd({
  hostname,
  siteName,
  description,
  pageUrl,
  lang,
  alternateLanguages,
}) {
  const website = {
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

  // Добавляем информацию о языке
  if (lang) {
    website.inLanguage = lang
  }

  // Добавляем альтернативные языковые версии
  if (alternateLanguages && alternateLanguages.length > 0) {
    website.alternateName = alternateLanguages.map(
      (lang) => `${siteName} (${lang.name})`
    )
    website.sameAs = alternateLanguages.map((lang) => lang.url)
  }

  return website
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
  lang,
  alternateLanguages,
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

  // Добавляем информацию о языке
  if (lang) {
    article.inLanguage = lang
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

  // Добавляем альтернативные языковые версии
  if (alternateLanguages && alternateLanguages.length > 0) {
    article.isPartOf = {
      '@type': 'CreativeWork',
      '@id': `${hostname}/#website`,
      inLanguage: lang,
      hasPart: alternateLanguages.map((lang) => ({
        '@type': 'CreativeWork',
        '@id': lang.url,
        inLanguage: lang.code,
        url: lang.url,
      })),
    }
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
  lang,
  alternateLanguages,
}) {
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: pageUrl,
    publisher: { '@type': 'Organization', name: siteName, url: hostname },
  }

  // Добавляем информацию о языке
  if (lang) {
    webPage.inLanguage = lang
  }

  // Добавляем изображение если есть
  if (cover) {
    webPage.image = {
      '@type': 'ImageObject',
      url: cover.startsWith('http') ? cover : `${hostname}${cover}`,
    }
  }

  // Добавляем альтернативные языковые версии
  if (alternateLanguages && alternateLanguages.length > 0) {
    webPage.isPartOf = {
      '@type': 'WebSite',
      '@id': `${hostname}/#website`,
      inLanguage: lang,
      hasPart: alternateLanguages.map((lang) => ({
        '@type': 'WebPage',
        '@id': lang.url,
        inLanguage: lang.code,
        url: lang.url,
      })),
    }
  }

  return webPage
}

/**
 * Добавляет JSON-LD структурированные данные на страницу Только для постов и
 * страниц
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function addJsonLd(pageData, { siteConfig }) {
  // TODO: а что на обычных страницах?
  if (!isPost(pageData.frontmatter) && !isPage(pageData.frontmatter)) return

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

  // Получаем информацию о языке
  const lang = langConfig.lang || langIndex
  const alternateLanguages = []

  // Собираем альтернативные языковые версии
  if (siteConfig.site.locales) {
    Object.entries(siteConfig.site.locales).forEach(([code, locale]) => {
      if (code !== langIndex && code !== ROOT_LANG) {
        // Генерируем URL для альтернативной языковой версии
        const alternateUrl = generatePageUrl(
          hostname,
          pageData.filePath.replace(`/${langIndex}/`, `/${code}/`)
        )
        alternateLanguages.push({
          code: locale.lang || code,
          name: locale.title || code,
          url: alternateUrl,
        })
      }
    })
  }

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
      lang,
      alternateLanguages,
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
      lang,
      alternateLanguages,
    })
  } else {
    jsonLdData = createWebPageJsonLd({
      title,
      description,
      pageUrl,
      hostname,
      siteName,
      cover,
      lang,
      alternateLanguages,
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
