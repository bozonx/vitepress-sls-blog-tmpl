//import moment from 'moment/min/moment-with-locales.js'


// export function makeHumanDate(rawDate, lang) {
//   if (!rawDate) return
//
//   return moment(rawDate, "YYYY-MM-DD").locale(lang).format('LL')
// }

export function resolveI18Href(rawHref, localeIndex, i18nRouting) {
  if (!rawHref) return rawHref

  const isExternal = isExternalUrl(rawHref)

  if (isExternal || !i18nRouting) return rawHref

  return `/${localeIndex}${rawHref}`
}

export function isExternalUrl(url) {
  return Boolean(url && url.match(/^[\a-z\d]+\:\/\//))
  //return url && !url.startsWith('/')
}

