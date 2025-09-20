import { filterSitemap } from '../transformers/filterSitemap.js'
import { addOgMetaTags } from '../transformers/addOgMetaTags.js'
import { resolveDescription } from '../transformers/resolveDescription.js'
import { addJsonLd } from '../transformers/addJsonLd.js'
import { addHreflang } from '../transformers/addHreflang.js'
import { addCanonicalLink } from '../transformers/addCanonicalLink.js'

export const common = {
  head: [
    // tell IE to use the most modern engine
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }],

    ['link', { rel: 'icon', sizes: '16x16', href: '/img/favicon-16x16.png' }],
    ['link', { rel: 'icon', sizes: '32x32', href: '/img/favicon-32x32.png' }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/apple-touch-icon.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
  ],
  outDir: '../docs',
  cacheDir: '../.cache',
  srcExclude: ['/site'],
  metaChunk: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  cleanUrls: true,
  appearance: true,
  lang: 'en-US',
  locales: { root: { lang: 'en-US' } },

  // max description length for description meta tag,
  //  open graph, json-ld and for rss feed
  // for RSS max is 500 characters
  maxDescriptionLength: 300,

  themeConfig: {
    externalLinkIcon: true,
    // i18nRouting: true,

    search: { provider: 'local' },

    lastUpdated: { formatOptions: { dateStyle: 'medium', forceLocale: true } },

    donateUrl: 'page/donate',
    linksUrl: 'page/links',
    docUrl: 'doc',
    mainHeroImg: '/img/home-logo.webp',
  },
  markdown: { image: { lazyLoading: true } },
}

export function mergeSiteConfig(config) {
  return {
    ...common,
    ...config,
    title: config.title || config.en?.title,
    description: config.description || config.en?.description,

    head: [...common.head, ...(config.head || [])],
    themeConfig: {
      ...common.themeConfig,
      ...config.themeConfig,
      socialLinks: config.repo && [{ icon: 'github', link: config.repo }],
    },
    locales: { ...common.locales, ...config.locales },

    sitemap: {
      hostname: config.hostname,
      // fix sitemap - remove root from it
      // transformItems: (items) => {
      //   return filterSitemap(items)
      // },

      ...config.sitemap,
    },

    async transformPageData(pageData, ctx) {
      resolveDescription(pageData, ctx)

      if (config.transformPageData) {
        await config.transformPageData(pageData, ctx)
      }
    },

    async transformHead(ctx) {
      // addOgMetaTags(pageData, ctx)
      // addJsonLd(ctx)
      // addHreflang(ctx)
      addCanonicalLink(ctx)

      if (config.transformHead) {
        await config.transformHead(ctx)
      }
    },

    // TODO: add md

    vite: {
      ...config.vite,
      ssr: { noExternal: ['vitepress-sls-blog-tmpl'], ...config.vite?.ssr },
    },
  }
}
