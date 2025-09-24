import { addJsonLd } from '../transformers/addJsonLd.js'
import { addHreflang } from '../transformers/addHreflang.js'
import { addOgMetaTags } from '../transformers/addOgMetaTags.js'
import { addRssLinks } from '../transformers/addRssLinks.js'
import { filterSitemap } from '../transformers/filterSitemap.js'
import { generateRssFeed } from '../transformers/generateRssFeed.js'
import { transformPageMeta } from '../transformers/transformPageMeta.js'
import { transformTitle } from '../transformers/transformTitle.js'
import { resolveDescription } from '../transformers/resolveDescription.js'
import { addCanonicalLink } from '../transformers/addCanonicalLink.js'
import { collectImageDimensions } from '../transformers/collectImageDimensions.js'
import { mdImage } from '../transformers/mdImage.js'

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
  lang: 'en-US',
  locales: { root: { lang: 'en-US' } },

  // Build params
  maxPostsInRssFeed: 50,
  rssFormats: ['rss', 'atom', 'json'],
  // max description length for description meta tag,
  //  open graph, json-ld and for rss feed
  // for RSS max is 500 characters
  maxDescriptionLength: 300,

  themeConfig: {
    i18nRouting: true,
    externalLinkIcon: true,
    mainHeroImg: '/img/home-logo.webp',

    sidebarTagsCount: 15,
    similarPostsCount: 5,
    homeBgParalaxOffset: 300,
    paginationMaxItems: 7,
    // show author in post list if the blog have authors
    showAuthorInPostList: true,

    tagsBaseUrl: 'tag',
    allTagsUrl: 'tags',
    archiveBaseUrl: 'archive',
    recentBaseUrl: 'recent',
    allAuthorBaseUrl: 'authors',
    authorBaseUrl: 'author',

    donateIcon: 'fa6-solid:heart',
    recentIcon: 'fa6-solid:newspaper',
    byDateIcon: 'fa6-solid:calendar-days',
    authorsIcon: 'mdi:users',
    // social icons
    socialLinksIcon: 'heroicons:megaphone-16-solid',
    rssIcon: 'bi:rss-fill',
    atomIcon: 'vscode-icons:file-type-atom',
    youtubeIcon: 'fa6-brands:youtube',
    telegramIcon: 'fa6-brands:telegram',
    chatIcon: 'fa6-solid:message',
    ///// not used
    // docIcon: 'iconoir:book-solid',
    // tagsIcon: 'fa6-solid:tag',
  },
}

export function mergeBlogConfig(config) {
  return {
    ...common,
    ...config,
    title: config.title || config.en?.title,
    description: config.description || config.en?.description,
    head: [...common.head, ...(config.head || [])],
    locales: { ...common.locales, ...config.locales },
    vite: {
      ...config.vite,
      ssr: { noExternal: ['vitepress-sls-blog-tmpl'], ...config.vite?.ssr },
    },
    sitemap: {
      hostname: config.hostname,
      // fix sitemap - remove root from it
      transformItems: (items) => {
        return filterSitemap(items)
      },

      ...config.sitemap,
    },
    markdown: {
      ...config.markdown,
      image: { lazyLoading: true, ...config.markdown?.image },
      // Отключаем rel="noreferrer" для внешних ссылок
      externalLinks: { target: '_blank', rel: [] },
      config: (md) => {
        md.use(mdImage, { srcDir: config.srcDir })

        if (config.markdown?.config) {
          config.markdown.config(md)
        }
      },
    },

    themeConfig: { ...common.themeConfig, ...config.themeConfig },

    async transformPageData(pageData, ctx) {
      collectImageDimensions(pageData, ctx)
      transformTitle(pageData, ctx)
      transformPageMeta(pageData, ctx)
      resolveDescription(pageData, ctx)

      if (config.transformPageData) {
        await config.transformPageData(pageData, ctx)
      }
    },

    async transformHead(ctx) {
      addOgMetaTags(ctx)
      addJsonLd(ctx)
      addHreflang(ctx)
      addCanonicalLink(ctx)
      addRssLinks(ctx)

      if (config.transformHead) {
        await config.transformHead(ctx)
      }
    },

    buildEnd: async (cfg) => {
      await generateRssFeed(cfg)

      if (config.buildEnd) {
        await config.buildEnd(cfg)
      }
    },
  }
}
