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

export function makeMonthsList(allData, year) {
  const curYear = Number(year)
  const months = {}

  for (const item of allData) {
    const postYear = new Date(item.date).getFullYear()

    if (postYear !== curYear) continue

    const postMonth = new Date(item.date).getUTCMonth() + 1

    if (typeof months[postMonth] === 'undefined') {
      months[postMonth] = 1
    }
    else {
      months[postMonth]++
    }
  }

  const res = Object.keys(months)
     .map((month) => ({ month: Number(month), count: months[month] }))

  res.sort((a, b) => b.month + a.month)
  
  return res 
}

export function makeYearsList(allData) {
  const years = {}

  for (const item of allData) {
    const postYear = new Date(item.date).getFullYear()

    if (typeof years[postYear] === 'undefined') {
      years[postYear] = 1
    }
    else {
      years[postYear]++
    }
  }

  const res = Object.keys(years)
     .map((year) => ({ year: Number(year), count: years[year] }))

  res.sort((a, b) => b.year + a.year)
  
  return res 
}

export function makePostOfMonthList(allData, year, month) {
  const res = []

  for (const item of allData) {
    const postYear = new Date(item.date).getFullYear()

    if (postYear !== year) continue

    const postMonth = new Date(item.date).getUTCMonth() + 1

    if (postMonth !== month) continue

    res.push(item)
  }

  return res
}

