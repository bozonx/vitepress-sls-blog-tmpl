import { defineConfig } from 'vitepress'
import blogConfigBase from 'vitepress-sls-blog-tmpl/blogConfigBase.js'
import { loadBlogLocale } from 'vitepress-sls-blog-tmpl/blogConfigHelper.js'

import { PROPS } from './props.js'

const ru = loadBlogLocale('ru', __filename, PROPS)
const en = loadBlogLocale('en', __filename, PROPS)
const configBase = blogConfigBase(PROPS, en)

export default defineConfig({
  ...configBase,
  locales: {
    ...configBase.locales,
    en: { lang: 'en-US', ...en },
    ru: { lang: 'ru-RU', ...ru },
  },
  themeConfig: {
    ...configBase.themeConfig,
    sidebarLogoSrc: '/img/sidebar-logo.webp',
    paginationMaxItems: 7,
  },
  head: [
    ...configBase.head,
    // do not recognize telephone numbers on the page
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
  ],
})
