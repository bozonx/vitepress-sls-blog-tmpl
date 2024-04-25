import { trimChar } from 'squidlet-lib/js'
import moment from 'moment/min/moment-with-locales.js'


export function makeHumanDate(rawDate, lang) {
  if (!rawDate) return

  return moment(rawDate, "YYYY-MM-DD").locale(lang).format('LL')
}

export function resolveI18Href(rawHref, localeIndex, i18nRouting) {
  if (!rawHref) return rawHref

  const isExternal = isExternalUrl(rawHref)

  if (isExternal || !i18nRouting) return rawHref

  return `/${localeIndex}${rawHref}`
}

export function isExternalUrl(url) {
  return url && !url.startsWith('/')
}

export function parsePostItem(rawData) {
  const [ lang, date, fileName ] = trimChar(rawData.url, '/').split('/')
  const previewFromMd= extractPreviewFromMd(rawData)
  const preData = {
    ...rawData,
    lang,
    date,
    fileName,
  }

  if (rawData.frontmatter.type === 'article') {
    return {
      ...preData,
      fromMd: {
        title: extractTitleFromMd(rawData),
        preview: previewFromMd,
        image: extractImageFromMd(rawData),
        author: resoveAuthor(rawData),
      },
    }
  }
  else if (rawData.frontmatter.type === 'post') {
    return {
      ...preData,
      fromMd: {
        preview: previewFromMd,
        author: resoveAuthor(rawData),
      },
    }
  }
  else if (rawData.frontmatter.type === 'video') {
    return {
      ...preData,
      fromMd: {
        title: extractTitleFromMd(rawData),
        preview: previewFromMd,
      },
    }
  }
  else if (rawData.frontmatter.type === 'audio') {
    return {
      ...preData,
      fromMd: {
        title: extractTitleFromMd(rawData),
        preview: previewFromMd,
      },
    }
  }
  else {
    throw new Error(`Post doesn't have type. ${JSON.stringify(rawData, null, 2)}`)
  }
}

export function extractTitleFromMd(rawData) {
  const firstTitleMatch = removeFrontmatter(rawData.src).match(/^\#\s+(.+)$/m)

  return (firstTitleMatch) ? firstTitleMatch[1] : null
}

export function extractImageFromMd(rawData) {
  const firstImgMatch = removeFrontmatter(rawData.src).match(/\!\[[^\]]*\]\(([^\)]+)\)/)

  return (firstImgMatch) ? firstImgMatch[1] : null
}

export function extractPreviewFromMd(rawData) {
  // TODO: do it
}

export function resoveAuthor(rawData) {
  // TODO: do it

// # ID of author of site team
// authorId: 1
// # set it for some other authores
// authorCustom: [Ivan K](https://somesite.com)
}

export function removeFrontmatter(rawMd) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/

  return rawMd.replace(frontmatterRegex, '')
}

