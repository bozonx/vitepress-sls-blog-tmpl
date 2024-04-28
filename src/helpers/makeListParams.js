import path from 'path'
import grayMatter from 'gray-matter'
import fs from 'fs'
import { transliterate } from './transliterate.js'
import { DEFAULT_ENCODE } from '../constants.js'


export function makeRecentParams(postsDirAbs, perPage) {
  const dates = loadDatesList(postsDirAbs)
  const res = []

  for (let i = 0; i < dates.length; i += perPage) {
    const curPageNum = (i === 0) ? i  + 1: i - perPage + 2

    res.push({ params: { page: `${curPageNum}` }})
  }

  return res
}

export function makeYearsParams(postsDirAbs) {
  const years = loadYears(postsDirAbs)

  return years.map((item) => ({ params: { year: `${item}` } }))
}

export function makeMonthsParams(postsDirAbs) {
  const years = loadYears(postsDirAbs)
  const res = []

  for (const year of years) {
    for (let i = 0; i < 12; i++) {

      // TODO: нужно только те месяцы по которым есть записи

      res.push({params: {year: `${year}`, month: `${i + 1}`}})
    }
  }

  console.log(111, res)

  return res
}

export function makeTagsParams(postsDirAbs, perPage, lang) {
  const tagsCount = {}
  const dates = loadDatesList(postsDirAbs)

  for (const date of dates) {
    const datePath = path.join(postsDirAbs, date)
    const posts = fs.readdirSync(datePath, DEFAULT_ENCODE)
    const filteredPosts = posts.filter((item) => item.endsWith('.md'))

    for (const postName of posts) {
      const postPath = path.join(datePath, postName)
      const postRawContent = fs.readFileSync(postPath, DEFAULT_ENCODE)
      const { data } = grayMatter(postRawContent)
      const tags = data.tags

      if (!tags?.length) continue

      for (const tag of tags) {
        if (typeof tagsCount[tag] === 'undefined') {
          tagsCount[tag] = 1
        }
        else {
          tagsCount[tag]++
        }
      }
    }
  }

  const res = []

  for (const tag of Object.keys(tagsCount)) {
    const preparedTag = transliterate(tag, lang)

    for (let i = 0; i < Math.ceil(tagsCount[tag] / perPage); i++) {
      res.push({ params: { name: preparedTag, tag, page: i + 1 }})
    }
  }

  return res
}


export function loadDatesList(postsDirAbs) {
  const dates = fs.readdirSync(postsDirAbs, DEFAULT_ENCODE)
  
  return dates.filter((item) => {
    if (!item.match(/^\d{4}\-\d{2}\-\d{2}$/)) return

    const itemPath = path.join(postsDirAbs, item)
    const stat = fs.statSync(itemPath)

    return stat.isDirectory()
  })
}

export function loadYears(postsDirAbs) {
  const dates = loadDatesList(postsDirAbs)

  return dates.reduce((acc, date) => {
    const year = new Date(date).getFullYear()
    if (!acc.includes(year)) {
      acc.push(year)
    }
    return acc
  }, [])
}
