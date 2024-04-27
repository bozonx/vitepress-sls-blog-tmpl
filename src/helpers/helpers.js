import moment from 'moment/min/moment-with-locales.js'
// import fs from 'fs'


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

export function makeTagsList(allData) {
  const tags = {}

  for (const item of allData) {
    if (!item.tags) continue

    for (const tag of item.tags) {
      if (typeof tags[tag] === 'undefined') {
        tags[tag] = 1
      }
      else {
        tags[tag]++
      }
    }
  }

  const res = Object.keys(tags).map((tag) => ({ name: tag, count: tags[tag] }))

  res.sort((a, b) => b.count - a.count)

  return res
}

// export function mkdirIfNotExist(dirNameAbs) {
//   let stat
//
//   try {
//     stat = fs.statSync(dirNameAbs)
//   }
//   catch(e) {
//   }
//
//   if (!stat) fs.mkdirSync(dirNameAbs)
// }

