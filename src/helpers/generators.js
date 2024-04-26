import path from 'path'
import fs from 'fs'
import moment from 'moment'
import lodashTemplate from 'lodash.template'
import { parseMdFile } from './parseMdFile.js'
import { mkdirIfNotExist } from './helpers.js'
import {
  DEFAULT_ENCODE,
  POSTS_DIR,
  PREBUILD_RECENT,
  PREBUILD_ARCHIVE,
  PREBUILD_ALL_TAGS,
  PREBUILD_TAGS,
  ITEMS_PER_PAGE,
} from '../constants.js'


export function eachLangForGeneration(dotVitepressPwd, cb, postsDir = POSTS_DIR) {
  const srcDir = path.resolve(dotVitepressPwd, '../')
  const dirContent = fs.readdirSync(srcDir, DEFAULT_ENCODE)

  // TODO: cleanup .prebuild

  for (const item of dirContent) {
    if (['.vitepress', 'public'].includes(item) || item.startsWith('.')) continue

    const itemPath = path.join(srcDir, item)
    const stat = fs.statSync(itemPath)

    if (!stat.isDirectory()) continue

    const postsDirAbs = path.join(itemPath, POSTS_DIR)

    cb(postsDirAbs, item)
  }
}

export function generateRecent(preBuildDirAbs, postsDirAbs, tmplMd, lang) {
  const postsData = makePostsData(postsDirAbs)
  const sorted = postsData.sort((a, b) => {
    return moment(b.date).diff(moment(a.date));
  })

  mkdirIfNotExist(path.join(preBuildDirAbs, PREBUILD_RECENT))

  for (let i = 0; i < sorted.length; i += ITEMS_PER_PAGE) {
    const slice = sorted.slice(i, i + ITEMS_PER_PAGE)
    const curPageNum = ((i === 0) ? i : i - ITEMS_PER_PAGE) + 1
    const listItemFilePath = path.join(preBuildDirAbs, PREBUILD_RECENT, `${curPageNum}.md`)
    const itemsData = {
      items: slice,
      curPage: curPageNum,
      totalPages: Math.ceil(sorted.length / ITEMS_PER_PAGE)
    }
    const preScript = `<script>const $itemsData = ${JSON.stringify(itemsData)}</script>\n\n`
    const result = preScript + tmplMd

    fs.writeFileSync(listItemFilePath, result, DEFAULT_ENCODE)
  }
}

export function generateArchiveYears(preBuildDirAbs, postsDirAbs, tmplMd, lang) {
  // TODO: страница на каждый год
}

export function generateTagsPages(preBuildDirAbs, postsDirAbs, tmplMd, lang) {

}


export function makePostsData(postsDirAbs) {
  const res = []
  const dates = fs.readdirSync(postsDirAbs, DEFAULT_ENCODE)

  for (const date of dates) {
    const datePath = path.join(postsDirAbs, date)
    const stat = fs.statSync(datePath)

    if (!stat.isDirectory()) continue

    const postsFileNames = fs.readdirSync(datePath, DEFAULT_ENCODE)

    for (const postFileName of postsFileNames) {
      if (!postFileName.endsWith('.md')) continue

      const postPath = path.join(datePath, postFileName)
      const rawContent = fs.readFileSync(postPath, DEFAULT_ENCODE)
      const { meta, title, preview } = parseMdFile(rawContent)

      res.push({
        date,
        title,
        preview,
        tags: meta.tags,
      })
    }
  }


  return res
}

