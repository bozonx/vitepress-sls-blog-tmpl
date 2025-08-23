import fs from 'fs'
import path from 'path'

import { DEFAULT_ENCODE } from '../constants.js'
import { parseMdFile } from '../helpers/mdWorks.js'
import { transliterate } from '../helpers/transliterate.js'

export function makeRecentParams(postsDirAbs, perPage) {
  const dates = loadDatesList(postsDirAbs)
  const res = []

  for (let i = 0; i < dates.length; i += perPage) {
    const page = i / perPage + 1

    res.push({ params: { page } })
  }

  return res
}

export function makeYearPostsParams(postsDirAbs, perPage) {
  const dates = loadDatesList(postsDirAbs)

  // Группируем даты по годам
  const postsByYear = {}

  for (const date of dates) {
    const year = new Date(date).getUTCFullYear()

    if (!postsByYear[year]) {
      postsByYear[year] = []
    }

    postsByYear[year].push(date)
  }

  const res = []

  // Для каждого года создаем отдельную нумерацию страниц
  for (const [year, yearDates] of Object.entries(postsByYear)) {
    for (let i = 0; i < yearDates.length; i += perPage) {
      const page = i / perPage + 1

      res.push({ params: { page, year: Number(year) } })
    }
  }

  return res
}

export function makeMonthsParams(postsDirAbs) {
  const monthCount = {}
  const dates = loadDatesList(postsDirAbs)

  for (const date of dates) {
    const year = new Date(date).getUTCFullYear()
    const month = new Date(date).getUTCMonth() + 1
    const yearMonth = `${year}-${month}`

    if (typeof monthCount[yearMonth] === 'undefined') {
      monthCount[yearMonth] = 1
    } else {
      monthCount[yearMonth]++
    }
  }

  const res = Object.keys(monthCount).map((item) => {
    const splat = item.split('-')
    const year = Number(splat[0])
    const month = Number(splat[1])

    return { params: { year, month } }
  })

  return res
}

export function makeTagsParams(postsDirAbs, perPage, lang) {
  const tagsCount = {}
  const allFiles = fs
    .readdirSync(postsDirAbs, DEFAULT_ENCODE)
    .filter((item) => item.match(/\.md$/))

  for (const item of allFiles) {
    const itemPath = path.join(postsDirAbs, item)
    const rawContent = fs.readFileSync(itemPath, DEFAULT_ENCODE)
    const { frontmatter } = parseMdFile(rawContent)
    const tags = frontmatter.tags

    if (!tags?.length) continue

    for (const tag of tags) {
      if (typeof tagsCount[tag] === 'undefined') {
        tagsCount[tag] = 1
      } else {
        tagsCount[tag]++
      }
    }
  }

  // const dates = loadDatesList(postsDirAbs);
  //
  // for (const date of dates) {
  //   const datePath = path.join(postsDirAbs, date);
  //   const posts = fs.readdirSync(datePath, DEFAULT_ENCODE);
  //   const filteredPosts = posts.filter((item) => item.endsWith(".md"));
  //
  //   for (const postName of posts) {
  //     const postPath = path.join(datePath, postName);
  //     const postRawContent = fs.readFileSync(postPath, DEFAULT_ENCODE);
  //     const { data } = grayMatter(postRawContent);
  //     const tags = data.tags;
  //
  //     if (!tags?.length) continue;
  //
  //     for (const tag of tags) {
  //       if (typeof tagsCount[tag] === "undefined") {
  //         tagsCount[tag] = 1;
  //       } else {
  //         tagsCount[tag]++;
  //       }
  //     }
  //   }
  // }

  const res = []

  for (const name of Object.keys(tagsCount)) {
    const slug = transliterate(name, lang)

    for (let i = 0; i < Math.ceil(tagsCount[name] / perPage); i++) {
      res.push({ params: { slug, name, page: i + 1 } })
    }
  }

  return res
}

export function makeAuthorsParams(postsDirAbs, perPage) {
  const allFiles = fs.readdirSync(postsDirAbs, DEFAULT_ENCODE)
  const authorIds = allFiles
    .filter((item) => item.match(/\.md$/))
    .map((item) => {
      const itemPath = path.join(postsDirAbs, item)
      const rawContent = fs.readFileSync(itemPath, DEFAULT_ENCODE)
      const { frontmatter } = parseMdFile(rawContent)

      return frontmatter.authorId
    })
    .filter((item) => Boolean(item))
  const authorPostCount = {}
  const res = []

  for (const id of authorIds) {
    if (authorPostCount[id]) {
      authorPostCount[id]++
    } else {
      authorPostCount[id] = 1
    }
  }

  for (const id of Object.keys(authorPostCount)) {
    for (let i = 0; i < authorPostCount[id]; i += perPage) {
      const page = i / perPage + 1

      res.push({ params: { id, page } })
    }
  }

  return res
}

export function loadDatesList(postsDirAbs) {
  const allFiles = fs.readdirSync(postsDirAbs, DEFAULT_ENCODE)

  return allFiles
    .filter((item) => item.match(/\.md$/))
    .map((item) => {
      const itemPath = path.join(postsDirAbs, item)
      const rawContent = fs.readFileSync(itemPath, DEFAULT_ENCODE)
      const { frontmatter } = parseMdFile(rawContent)

      return frontmatter.date
    })
}

// export function loadYears(postsDirAbs) {
//   const dates = loadDatesList(postsDirAbs)

//   return dates.reduce((acc, date) => {
//     const year = new Date(date).getUTCFullYear()

//     if (!acc.includes(year)) {
//       acc.push(year)
//     }

//     return acc
//   }, [])
// }
