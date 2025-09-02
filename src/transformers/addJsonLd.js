import fs from 'fs'
import path from 'path'

import { DEFAULT_ENCODE, ROOT_LANG } from '../constants.js'
import { isPost } from '../helpers/helpers.js'
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
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    url: pageUrl,
    datePublished: date,

    // TODO: add to config
    publisher: { '@type': 'Organization', name: siteName, url: hostname },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    inLanguage: lang,
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

  return article
}

/**
 * Добавляет JSON-LD структурированные данные на страницу Только для постов
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function addJsonLd(pageData, { siteConfig }) {
  if (!isPost(pageData.frontmatter)) return

  const hostname = siteConfig.userConfig.hostname
  const langIndex = pageData.filePath.split('/')[0]
  const langConfig = siteConfig.site.locales[langIndex]
  const siteName = langConfig.title
  const title = pageData.title
  const author =
    pageData.frontmatter.authorId &&
    langConfig.themeConfig.authors?.find(
      (item) => item.id === pageData.frontmatter.authorId
    )?.name
  const cover = pageData.frontmatter.cover

  // TODO: review
  const pageUrl = generatePageUrl(hostname, pageData.filePath)

  // Получаем информацию о языке
  const lang = langConfig.lang || langIndex
  const alternateLanguages = []

  // Собираем альтернативные языковые версии
  if (siteConfig.site.locales) {
    Object.entries(siteConfig.site.locales).forEach(([code, locale]) => {
      if (code !== langIndex && code !== ROOT_LANG) {
        // TODO: review
        // TODO: не правильный язык в url
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

  // TODO: review - что есть оно пустое - нужно брать вверхнее описание
  // Получаем описание
  let description = pageData.frontmatter.description

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

  // Создаем соответствующую JSON-LD структуру
  const jsonLdData = createArticleJsonLd({
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

  // Инициализируем head если его нет
  pageData.frontmatter.head ??= []

  // Добавляем JSON-LD скрипт
  pageData.frontmatter.head.push([
    'script',
    { type: 'application/ld+json' },
    JSON.stringify(jsonLdData, null, 2),
  ])
}
