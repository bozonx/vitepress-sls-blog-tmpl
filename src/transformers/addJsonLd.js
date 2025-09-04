import { ROOT_LANG } from '../constants.js'
import {
  isPost,
  generatePageUrlPath,
  isAuthorPage,
  isPage,
} from '../helpers/helpers.js'
import yaml from 'yaml'

function parseYaToJsonLd(strYaml) {
  try {
    return yaml.parse(strYaml)
  } catch (error) {
    console.warn('Ошибка при парсинге frontmatter.jsonLd:', error)
    return {} // Возвращаем пустой объект вместо undefined
  }
}

function createAuthorJsonLd(pageData, siteConfig, langConfig) {
  /*
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Иван Иванов",
    "url": "https://example.com/author/ivan-ivanov",
    "description": "Иван Иванов — эксперт в области технологий и программирования, автор множества статей о разработке и ИИ.",
    "image": "https://example.com/images/ivan-ivanov.jpg",
    "sameAs": [
    "https://twitter.com/ivanov",
    ],
*/

  const authors = langConfig.themeConfig.authors
  const authorId = pageData.frontmatter.authorId
  const author = authors.find((item) => item.id === authorId)

  return { '@context': 'https://schema.org', '@type': 'Person', name: authorId }
}

/**
 * Создает JSON-LD структуру для статьи
 *
 * @param {Object} params - Параметры для создания структуры
 * @returns {Object} JSON-LD объект
 */
function createArticleJsonLd(
  pageData,
  lang,
  langConfig,
  hostname,
  pageUrl,
  publisher
) {
  const title = pageData.title
  const description = pageData.description
  const author =
    pageData.frontmatter.authorId &&
    langConfig.themeConfig.authors?.find(
      (item) => item.id === pageData.frontmatter.authorId
    )?.name
  const cover = pageData.frontmatter.cover
  const date = pageData.frontmatter.date
  const updated = pageData.frontmatter.updated
  const tags = pageData.frontmatter.tags

  // Создаем базовую структуру статьи
  const article = {
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    url: pageUrl,
    datePublished: date,
    publisher,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    inLanguage: lang,
    isPartOf: {
      '@type': 'CreativeWork',
      '@id': `${hostname}/#website`,
      inLanguage: lang,
      hasPart: alternateLanguages.map((altLang) => ({
        '@type': 'CreativeWork',
        '@id': altLang.url,
        inLanguage: altLang.code,
        url: altLang.url,
      })),
    },
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

  // Если указан frontmatter.jsonLd, парсим его и переопределяем поля
  if (pageData.frontmatter.jsonLd) {
    const customJsonLd = parseYaToJsonLd(pageData.frontmatter.jsonLd)
    // Переопределяем поля из customJsonLd
    if (customJsonLd && typeof customJsonLd === 'object') {
      Object.assign(article, customJsonLd)
    }
  }

  return article
}

function createPageJsonLd(pageData, pageUrl, publisher) {
  // Создаем базовую структуру страницы
  const page = {
    '@type': 'WebPage',
    name: pageData.title,
    url: pageUrl,
    description: pageData.description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${hostname}/#website`,
      name: siteName,
      url: hostname,
    },
  }

  // Добавляем издателя если есть
  if (publisher) {
    page.publisher = publisher
  }

  // Если указан frontmatter.jsonLd, парсим его и переопределяем поля
  if (pageData.frontmatter.jsonLd) {
    const customJsonLd = parseYaToJsonLd(pageData.frontmatter.jsonLd)
    // Переопределяем поля из customJsonLd
    if (customJsonLd && typeof customJsonLd === 'object') {
      Object.assign(page, customJsonLd)
    }
  }

  return page
}

/**
 * Добавляет JSON-LD структурированные данные на страницу. pageData.description
 * has to be resolved before start this transformer. Где добавляет:
 *
 * - Во всех постах добавляется BlogPosting + дополнительные поля из
 *   frontmatter.jsonLd в виде yaml
 * - На странице автора добавляется Person. Данные берутся из\
 *   Site/site.[localeIndex].yaml authors
 * - На всех остальных страницах где указан frontmatter.jsonLd в виде yaml
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function addJsonLd(pageData, { siteConfig }) {
  let jsonLdData = null

  // Объявляем переменные в начале функции
  const langIndex = pageData.filePath.split('/')[0]
  const langConfig = siteConfig.site.locales[langIndex]

  if (isAuthorPage(pageData.filePath)) {
    jsonLdData = createAuthorJsonLd(pageData, siteConfig, langConfig)
  } else if (isPost(pageData.frontmatter) || isPage(pageData.frontmatter)) {
    const hostname = siteConfig.userConfig.hostname
    const siteName = langConfig.title
    const pageUrl = `${hostname}/${generatePageUrlPath(pageData.relativePath)}`
    const lang = langConfig.lang || langIndex
    const [, ...restPath] = pageData.relativePath.split('/')
    const pagePathWithoutLang = restPath.join('/')
    const alternateLanguages = []

    // Собираем альтернативные языковые версии
    if (siteConfig.site.locales) {
      Object.entries(siteConfig.site.locales).forEach(([code, locale]) => {
        if (code === langIndex || code === ROOT_LANG) return
        // Генерируем URL для альтернативной языковой версии
        const alternateUrl = generatePageUrlPath(pagePathWithoutLang)

        alternateLanguages.push({
          code: locale.lang || code,
          url: `${hostname}/${code}/${alternateUrl}`,
        })
      })
    }

    // Формируем информацию об издателе для JSON-LD
    // Если langConfig.publisher не определен, поле не будет добавлено
    const publisher = langConfig.themeConfig.publisher && {
      '@type': 'Organization',
      name: langConfig.themeConfig.publisher.name || siteName,
      url: langConfig.themeConfig.publisher.url || hostname,
      logo: langConfig.themeConfig.publisher.logo && {
        '@type': 'ImageObject',
        url: langConfig.themeConfig.publisher.logo,
      },
    }

    if (isPost(pageData.frontmatter)) {
      jsonLdData = createArticleJsonLd(
        pageData,
        lang,
        langConfig,
        hostname,
        pageUrl,
        publisher
      )
    } else {
      jsonLdData = createPageJsonLd(pageData, pageUrl, publisher)
    }
  } else if (pageData.frontmatter.jsonLd) {
    // all other pages
    const customJsonLd = parseYaToJsonLd(pageData.frontmatter.jsonLd)
    if (customJsonLd && typeof customJsonLd === 'object') {
      jsonLdData = customJsonLd
    }
  } else {
    return
  }

  if (!jsonLdData || Object.keys(jsonLdData).length === 0) return

  // Инициализируем head если его нет
  pageData.frontmatter.head ??= []

  // Добавляем JSON-LD скрипт
  pageData.frontmatter.head.push([
    'script',
    { type: 'application/ld+json' },
    JSON.stringify(
      { '@context': 'https://schema.org', ...jsonLdData },
      null,
      2
    ),
  ])
}
