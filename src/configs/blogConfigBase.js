import { figure } from '@mdit/plugin-figure'
import { addJsonLd } from '../transformers/addJsonLd.js'
import { addHreflang } from '../transformers/addHreflang.js'
import { addOgMetaTags } from '../transformers/addOgMetaTags.js'
import { addRssLinks } from '../transformers/addRssLinks.js'
import { filterSitemap } from '../transformers/filterSitemap.js'
import { generateRssFeed } from '../transformers/generateRssFeed.js'
import { transformPageMeta } from '../transformers/transformPageMeta.js'
// import { removeH1Plugin } from "../helpers/mdit-remove-h1.js";
import { transformTitle } from '../transformers/transformTitle.js'
import { resolveDescription } from '../transformers/resolveDescription.js'
import { addCanonicalLink } from '../transformers/addCanonicalLink.js'
import { createYamlToJsonLd } from '../transformers/yamlToJsonLd.js'

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
  ignoreDeadLinks: true,
  lastUpdated: true,
  cleanUrls: true,
  // TODO:  check
  appearance: true,
  lang: 'en-US',
  locales: { root: { lang: 'en-US' } },

  themeConfig: {
    externalLinkIcon: true,
    i18nRouting: true,
    maxPostsInRssFeed: 50,
    rssFormats: ['rss', 'atom', 'json'],

    similarPostsCount: 5,
    homeBgParalaxOffset: 300,
    paginationMaxItems: 7,
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
    atomIcon: 'vscode-icons:file-type-atom',
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
        return filterSitemap(items)
      },
    },

    themeConfig: {
      ...common.themeConfig,
      socialLinks: repo && [
        { icon: 'fa6-brands:github-alt', href: repo, title: 'Github' },
      ],
    },
    transformPageData(pageData, ctx) {
      // transformTitle(pageData, ctx)
      resolveDescription(pageData, ctx)
      transformPageMeta(pageData, ctx)
      addOgMetaTags(pageData, ctx)
      addJsonLd(pageData, ctx)
      createYamlToJsonLd(pageData, ctx)
      addRssLinks(pageData, ctx)
      addHreflang(pageData, ctx)
      addCanonicalLink(pageData, ctx)
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
