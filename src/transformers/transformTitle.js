import { mustacheTemplate } from 'squidlet-lib'

/**
 * Fix titles of utility pages and others which are template strings like {{
 * theme.t.siteName }}
 */
export function transformTitle(pageData, { siteConfig }) {
  // skip root pages
  if (pageData.filePath.indexOf('/') < 0) return

  const langIndex = pageData.filePath.split('/')[0]

  const options = {
    theme: siteConfig.site.locales[langIndex].themeConfig,
    params: pageData.params,
  }

  pageData.title = mustacheTemplate(pageData.title, options)
}
