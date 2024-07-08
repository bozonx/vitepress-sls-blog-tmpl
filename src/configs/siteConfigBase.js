export const common = {
  //head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  outDir: "../docs",
  cacheDir: "../.cache",
  srcExclude: ["/site"],
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

    lastUpdated: {
      formatOptions: {
        dateStyle: "medium",
        forceLocale: true,
      },
    },
  },
};

export default function({ hostname, repo }, en) {
  return {
    ...common,
    title: en.title,
    description: en.description,

    sitemap: {
      hostname,
    },

    themeConfig: {
      ...common.themeConfig,
      socialLinks: repo && [{ icon: "github", link: repo }],
    },
  };
}
