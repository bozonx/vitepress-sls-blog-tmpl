import grayMatter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'
import html from 'rehype-stringify'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import strip from 'strip-markdown'

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
