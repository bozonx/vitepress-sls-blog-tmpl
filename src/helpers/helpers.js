import { pathTrimExt } from 'squidlet-lib'

// /**
//  * Returns [640, 320] from "some-file-name--640x320.avif"
//  * or undefined is it doesn't contain dimestions
//  */
// export function extractImgDimensionFromFileName(fileName) {
//   const res = String(fileName).match(/\-\-(\d{3,})x(\d{3,})\.[\w\d]+$/);
//
//   if (res) return [Number(res[1]), Number(res[2])];
// }

// export function extractDateFromPostPath(postPath = '') {
//   const pathSplit = postPath.split('/')
//
//   return pathSplit[pathSplit.length - 2]
// }

/** Is it post or util page */
export function isPost(frontmatter) {
  if (!frontmatter) return

  return Boolean(frontmatter.date)
}

export function isHomePage(frontmatter) {
  if (!frontmatter) return

  return frontmatter.layout === 'home'
}

export function isPage(frontmatter) {
  if (!frontmatter) return

  return typeof frontmatter.layout === 'undefined' && !frontmatter.date
}

export function isAuthorPage(filePath, siteConfig) {
  if (!filePath) return false

  const authorBaseUrl = siteConfig.userConfig.themeConfig.authorBaseUrl

  return !!filePath.match(new RegExp(`^\\w+\/${authorBaseUrl}\/`))
}

export function makeHumanDate(rawDate, lang, toTimeZone = 'UTC') {
  if (!rawDate) return

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: toTimeZone,
  }

  return new Date(rawDate).toLocaleDateString(lang, options)
}

export function resolveI18Href(rawHref, localeIndex, i18nRouting) {
  const trimmed = String(rawHref).trim()

  if (typeof rawHref !== 'string' || !trimmed) return rawHref
  // main page
  else if (trimmed === '/') return '/' + localeIndex

  const isExternal = isExternalUrl(trimmed)

  if (isExternal || !i18nRouting) return trimmed
  // already included language
  if (trimmed.indexOf('/') === 0) return trimmed
  // add language - добавляем слеш между localeIndex и trimmed
  // Убираем начальный слеш из trimmed если он есть, чтобы избежать двойных слешей
  const cleanHref = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed
  return `/${localeIndex}/${cleanHref}`
}

export function isExternalUrl(url) {
  return Boolean(url && url.match(/^[\a-z\d]+\:\/\//))
}

/** Resolve article preview text inside article. Or return undefined */
export function resolveArticlePreview(frontmatter) {
  const { previewText, descrAsPreview, description } = frontmatter

  if (previewText) {
    return previewText
  } else if (descrAsPreview && description) {
    return description
  }
}

/**
 * Генерирует полный URL для текущей страницы from pageData.relativePath
 *
 * @param {string} relativePath - Путь к файлу
 * @returns {string} Полный URL
 */
export function generatePageUrlPath(relativePath) {
  // Убираем расширение файла
  const cleanPath = pathTrimExt(relativePath)

  // Убираем индекс из пути
  let finalPath = cleanPath.replace(/\/index$/, '')

  if (finalPath === 'index') finalPath = ''

  return finalPath
}
