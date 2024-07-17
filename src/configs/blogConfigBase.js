import { figure } from "@mdit/plugin-figure";
// import { removeH1Plugin } from "../helpers/mdit-remove-h1.js";
import { transformTitle } from "../helpers/transformTitle.js";

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
    // yandex social shares
    ["script", { src: "https://yastatic.net/share2/share.js" }],
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
    i18nRouting: true,

    showAuthorInPostList: true,
    tagsBaseUrl: "tag",
    allTagsUrl: "tags",
    archiveBaseUrl: "archive",
    recentBaseUrl: "recent",
    allAuthorBaseUrl: "authors",
    authorBaseUrl: "author",
    donateUrl: "page/donate",
    aboutUrl: "page/about",
    linksUrl: "page/links",
    donateIcon: "fa6-solid:heart",
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
      socialLinks: repo && [
        { icon: "fa6-brands:github-alt", link: repo, title: "Github" },
      ],
    },
    transformPageData(pageData, ctx) {
      transformTitle(pageData, ctx);
    },
    markdown: {
      image: {
        lazyLoading: true,
      },
      config: (md) => {
        // md.use(removeH1Plugin);
        md.use(figure);
      },
    },
  };
}
