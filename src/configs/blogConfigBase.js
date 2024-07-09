import { removeH1Plugin } from "../helpers/mdit-remove-h1.js";
import { transformTitle } from "../helpers/transformTitle.js";

export default {
  //head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  outDir: "../docs",
  cacheDir: "../.cache",
  metaChunk: true,
  lastUpdated: true,
  cleanUrls: true,
  lang: "en-US",
  locales: {
    root: { lang: "en-US" },
  },

  themeConfig: {
    //logo: '/logo.svg',
    i18nRouting: true,
    externalLinkIcon: true,
    tagsBaseUrl: "tag",
    allTagsUrl: "tags",
    archiveBaseUrl: "archive",
    recentBaseUrl: "recent",
    authorBaseUrl: "author",
  },
  transformPageData(pageData, ctx) {
    transformTitle(pageData, ctx);
  },
  markdown: {
    config: (md) => {
      md.use(removeH1Plugin);
    },
  },
};
