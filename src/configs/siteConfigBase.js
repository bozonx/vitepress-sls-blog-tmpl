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
    externalLinkIcon: true,
    search: {
      provider: "local",
    },

    // for locale files use
    lastUpdated: {
      formatOptions: {
        dateStyle: "medium",
        forceLocale: true,
      },
    },
  },
};
