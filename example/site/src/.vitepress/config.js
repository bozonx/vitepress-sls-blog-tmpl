import { defineConfig } from 'vitepress'
import { mergeSiteConfig } from 'vitepress-sls-blog-tmpl/siteConfigBase.js'
import { loadSiteLocale } from 'vitepress-sls-blog-tmpl/siteConfigHelper.js'

export default async () => {
  const config = defineConfig({
    hostname: 'https://',
    themeConfig: {
      repo: 'https://github.com/',
      logo: '/img/logo.svg',
      blogUrl: '',
    },
    head: [
      // do not recognize telephone numbers on the page
      ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ],
  })

  const en = await loadSiteLocale('en', __filename, config)

  return mergeSiteConfig({ ...config, locales: { en } })
}
