import path from 'node:path'
import { defineConfig } from 'vitepress'
import { mergeBlogConfig } from 'vitepress-sls-blog-tmpl/blogConfigBase.js'
import { loadBlogLocale } from 'vitepress-sls-blog-tmpl/blogConfigHelper.js'

export const PER_PAGE = 20

export default async () => {
  const config = defineConfig({
    srcDir: path.resolve(__dirname, '../'),
    siteUrl: 'https://myblog.org',
    repo: 'https://github.com/...',
    themeConfig: {
      perPage: PER_PAGE,
      sidebarLogoSrc: '/img/sidebar-logo.webp',

      googleAnalytics: {
        propertyId: '123456789',
        credentialsPath: '.../ga-credentials.json',
      },

      popularPosts: {
        enabled: true,
        sortBy: 'pageviews', // 'pageviews', 'uniquePageviews'
      },
    },
    head: [
      // do not recognize telephone numbers on the page
      ['meta', { name: 'format-detection', content: 'telephone=no' }],

      [
        'script',
        { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-...' },
      ],
      [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);} gtag('js', new Date());
       gtag('config', 'G-...');`,
      ],
    ],
  })

  return mergeBlogConfig({
    ...config,
    locales: {
      en: await loadBlogLocale('en', config),
      ru: await loadBlogLocale('ru', config),
    },
  })
}
