import { simpleTemplate } from '../helpers/helpers.js'

/**
 * Fix titles of utility pages which are template strings like {{
 * theme.t.siteName }}
 */
export function transformTitle(pageData, { siteConfig }) {
  // skip root index.md
  if (pageData.filePath.indexOf('/') < 0) return

  const langIndex = pageData.filePath.split('/')[0]

  const options = {
    theme: siteConfig.site.locales[langIndex].themeConfig,
    params: pageData.params,
  }

  pageData.title = simpleTemplate(pageData.title, options)
}
