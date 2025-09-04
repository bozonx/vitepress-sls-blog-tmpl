import grayMatter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'
import html from 'rehype-stringify'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import strip from 'strip-markdown'
import { smartTruncate } from 'squidlet-lib'
import { sanitizeText } from './helpers.js'

export function stripMd(mdContent) {
  if (!mdContent) return mdContent

  return remark().use(strip).processSync(mdContent).toString()
}

export function mdToHtml(mdContent) {
  if (!mdContent) return mdContent

  return remark()
    .use(remarkRehype)
    .use(rehypeExternalLinks, { target: '_blank', rel: [] })
    .use(html)
    .processSync(mdContent)
    .toString()
}

export function parseMdFile(rawContent) {
  const { data, content } = grayMatter(rawContent)

  return { frontmatter: data, content }
}

export function extractDescriptionFromMd(rawContent, maxLength) {
  const { content } = parseMdFile(rawContent)
  const mdContentNoHeader = removeTitleFromMd(content)
  const striped = stripMd(mdContentNoHeader)
  // TODO: review this
  const sanitized = sanitizeText(striped)

  return smartTruncate(sanitized, maxLength, { respectWords: true })
}

function removeTitleFromMd(mdNoFrontmatter) {
  return mdNoFrontmatter.trim().replace(/^\#\s+.+/, '')
}
