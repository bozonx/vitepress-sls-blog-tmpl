import { figure } from "@mdit/plugin-figure";
// import { removeH1Plugin } from "../helpers/mdit-remove-h1.js";
import { transformTitle } from "../helpers/transformTitle.js";
import { transformPageMeta } from "../helpers/transformPageMeta.js";

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
    docUrl: "doc",
    mainHeroImg: "/img/home-logo.webp",
    donateIcon: "fa6-solid:heart",
    docIcon: "iconoir:book-solid",
    socialLinksIcon: "heroicons:megaphone-16-solid",
    recentIcon: "fa6-solid:newspaper",
    tagsIcon: "fa6-solid:tag",
    byDateIcon: "fa6-solid:calendar-days",
    authorsIcon: "mdi:users",
    youtubeIcon: "fa6-brands:youtube",
    telegramIcon: "fa6-brands:telegram",
    chatIcon: "fa6-solid:message",
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
        { icon: "fa6-brands:github-alt", href: repo, title: "Github" },
      ],
    },
    transformPageData(pageData, ctx) {
      transformTitle(pageData, ctx);
      transformPageMeta(pageData, ctx);
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
    vite: {
      ssr: {
        noExternal: ["vitepress-sls-blog-tmpl"],
      },
    },
  };
}
