import { defineConfig } from 'vitepress'
import { mergeBlogConfig } from 'vitepress-sls-blog-tmpl/blogConfigBase.js'
import { loadBlogLocale } from 'vitepress-sls-blog-tmpl/blogConfigHelper.js'

export const PER_PAGE = 20

export default async () => {
  const config = defineConfig({
    hostname: 'https://',
    themeConfig: {
      repo: 'https://github.com/',
      siteUrl: 'https://',
      perPage: PER_PAGE,
      sidebarLogoSrc: '/img/sidebar-logo.webp',
    },
    head: [
      ...configBase.head,
      // do not recognize telephone numbers on the page
      ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ],
  })

  const en = await loadBlogLocale('en', __filename, config)

  return mergeBlogConfig({ ...config, locales: { en } })
}
