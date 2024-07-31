import { addOgMetaTags } from "../helpers/addOgMetaTags.js";

export const common = {
  head: [
    // tell IE to use the most modern engine
    ["meta", { "http-equiv": "X-UA-Compatible", content: "IE=edge" }],

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

    donateUrl: "page/donate",
    linksUrl: "page/links",
    docUrl: "doc",
    mainHeroImg: "/img/home-logo.webp",
  },
  markdown: {
    image: {
      lazyLoading: true,
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
    transformPageData(pageData, ctx) {
      addOgMetaTags(pageData, ctx);
    },
  };
}
