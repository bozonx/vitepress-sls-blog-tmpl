import { trimChar } from 'squidlet-lib/js'
import grayMatter from 'gray-matter'


export function parseMdFile(rawContent) {
  const { data, content } = grayMatter(rawContent);
  const onlyMdContentNoHeader = removeTitleFromMd(content)
  const extractedDescr = extractPreviewFromMd(onlyMdContentNoHeader)
  const preview = data.previewText || data.description || extractedDescr || ''

  return {
    // frontmatter
    meta: data,
    // extracted title
    title: extractTitleFromMd(content),
    // resolved preview
    preview,
    // only md content without frontmatter
    onlyMdContent: content,
    // content without h1 header
    onlyMdContentNoHeader,
    // description which is extracted from text
    extractedDescr,
  }
}
//
// export function parsePostItem(rawData) {
//   const [ lang, date, fileName ] = trimChar(rawData.url, '/').split('/')
//   const previewFromMd= extractPreviewFromMd(rawData)
//   const preData = {
//     ...rawData,
//     lang,
//     date,
//     fileName,
//   }
//
//   if (rawData.frontmatter.type === 'article') {
//     return {
//       ...preData,
//       fromMd: {
//         title: extractTitleFromMd(rawData),
//         preview: previewFromMd,
//         image: extractImageFromMd(rawData),
//         author: resoveAuthor(rawData),
//       },
//     }
//   }
//   else if (rawData.frontmatter.type === 'post') {
//     return {
//       ...preData,
//       fromMd: {
//         preview: previewFromMd,
//         author: resoveAuthor(rawData),
//       },
//     }
//   }
//   else if (rawData.frontmatter.type === 'video') {
//     return {
//       ...preData,
//       fromMd: {
//         title: extractTitleFromMd(rawData),
//         preview: previewFromMd,
//       },
//     }
//   }
//   else if (rawData.frontmatter.type === 'audio') {
//     return {
//       ...preData,
//       fromMd: {
//         title: extractTitleFromMd(rawData),
//         preview: previewFromMd,
//       },
//     }
//   }
//   else {
//     throw new Error(`Post doesn't have type. ${JSON.stringify(rawData, null, 2)}`)
//   }
// }
//
export function extractTitleFromMd(mdNoFrontmatter) {
  const firstTitleMatch = mdNoFrontmatter.match(/^\#\s+(.+)$/m)

  return (firstTitleMatch) ? firstTitleMatch[1].trim() : ''
}

export function removeTitleFromMd(mdNoFrontmatter) {
  return mdNoFrontmatter.trim().replace(/^\#\s+.+/, '')
}

// export function extractImageFromMd(rawData) {
//   const firstImgMatch = removeFrontmatter(rawData.src).match(/\!\[[^\]]*\]\(([^\)]+)\)/)
//
//   return (firstImgMatch) ? firstImgMatch[1] : null
// }

export function extractPreviewFromMd(onlyMdContentNoHeader) {
  
  // TODO: do it - сделать более умную обрезку

  return onlyMdContentNoHeader.substring(0, 150)
}

// export function removeFrontmatter(rawMd) {
//   const frontmatterRegex = /^---\n([\s\S]*?)\n---/
//
//   return rawMd.replace(frontmatterRegex, '')
// }

