import moment from 'moment/min/moment-with-locales.js'
import fs from 'fs'


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

export function mkdirIfNotExist(dirNameAbs) {
  let stat

  try {
    stat = fs.statSync(dirNameAbs)
  }
  catch(e) {
  }

  if (!stat) fs.mkdirSync(dirNameAbs)
}

