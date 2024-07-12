export const common = {
  head: [
    ["link", { rel: "icon", sizes: "16x16", href: "/img/favicon-16x16.png" }],
    ["link", { rel: "icon", sizes: "32x32", href: "/img/favicon-32x32.png" }],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/img/apple-touch-icon.png",
      },
    ],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
  ],
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
    logo: "/img/logo.svg",
    externalLinkIcon: true,
    // i18nRouting: true,

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
