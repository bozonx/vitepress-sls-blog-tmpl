import { removeRootItemFromSiteMap } from '../helpers/helpers.js'
import { addOgMetaTags } from '../page-helpers/addOgMetaTags.js'
import { generateRssFeed } from '../page-helpers/generateRssFeed.js'
import { transformPageMeta } from '../page-helpers/transformPageMeta.js'
// import { removeH1Plugin } from "../helpers/mdit-remove-h1.js";
import { transformTitle } from '../page-helpers/transformTitle.js'
import { figure } from '@mdit/plugin-figure'
import tailwindcss from '@tailwindcss/vite'

// import { makeYoutubeVideo } from "../helpers/makeYoutubeVideo.js";

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
    // yandex social shares
    // ["script", { src: "https://yastatic.net/share2/share.js" }],
  ],
  outDir: '../docs',
  cacheDir: '../.cache',
  srcExclude: ['/site'],
  metaChunk: true,
  lastUpdated: true,
  cleanUrls: true,
  lang: 'en-US',
  locales: { root: { lang: 'en-US' } },

  //vite: { plugins: [tailwindcss()] },

  themeConfig: {
    externalLinkIcon: true,
    i18nRouting: true,

    similarPostsCount: 5,
    homeBgParalaxOffset: 300,
    showAuthorInPostList: true,
    tagsBaseUrl: 'tag',
    allTagsUrl: 'tags',
    archiveBaseUrl: 'archive',
    recentBaseUrl: 'recent',
    allAuthorBaseUrl: 'authors',
    authorBaseUrl: 'author',
    donateUrl: 'page/donate',
    aboutUrl: 'page/about',
    linksUrl: 'page/links',
    docUrl: 'doc',
    mainHeroImg: '/img/home-logo.webp',
    donateIcon: 'fa6-solid:heart',
    docIcon: 'iconoir:book-solid',
    socialLinksIcon: 'heroicons:megaphone-16-solid',
    recentIcon: 'fa6-solid:newspaper',
    tagsIcon: 'fa6-solid:tag',
    byDateIcon: 'fa6-solid:calendar-days',
    authorsIcon: 'mdi:users',
    youtubeIcon: 'fa6-brands:youtube',
    telegramIcon: 'fa6-brands:telegram',
    chatIcon: 'fa6-solid:message',
    rssIcon: 'bi:rss-fill',
  },
}

export default function ({ hostname, repo }, en) {
  return {
    ...common,
    title: en.title,
    description: en.description,
    // it is used in addOgMetaTags
    hostname,

    sitemap: {
      hostname,
      // fix sitemap - remove root from it
      transformItems: (items) => {
        return removeRootItemFromSiteMap(items)
      },
    },

    themeConfig: {
      ...common.themeConfig,
      socialLinks: repo && [
        { icon: 'fa6-brands:github-alt', href: repo, title: 'Github' },
      ],
    },
    transformPageData(pageData, ctx) {
      transformTitle(pageData, ctx)
      transformPageMeta(pageData, ctx)
      addOgMetaTags(pageData, ctx)
    },
    buildEnd: async (config) => {
      await generateRssFeed(config)
    },
    markdown: {
      image: { lazyLoading: true },
      config: (md) => {
        // md.use(removeH1Plugin);
        md.use(figure)
        // md.use(makeYoutubeVideo);
      },
    },
    vite: { ssr: { noExternal: ['vitepress-sls-blog-tmpl'] } },
  }
}
