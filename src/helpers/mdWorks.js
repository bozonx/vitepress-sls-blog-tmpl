import grayMatter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'
import html from 'rehype-stringify'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import strip from 'strip-markdown'
import { smartTruncate, removeTitleFromMd } from 'squidlet-lib'

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

export function extractDescriptionFromMd(rawContent, maxLength, markAtTheEnd) {
  const { content } = parseMdFile(rawContent)
  const mdContentNoHeader = removeTitleFromMd(content)
  const striped = stripMd(mdContentNoHeader)

  return smartTruncate(striped, maxLength, { respectWords: true, markAtTheEnd })
}
