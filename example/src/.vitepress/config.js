import blogConfigBase from "vitepress-sls-blog-tmpl/src/configs/blogConfigBase.js";
import { makeCommonTheme } from "./themeLocaleconfig.js";
import en from "./locales/en";

export default {
  ...blogConfigBase,
  title: en.title,
  description: en.description,
  head: [
    // yandex social shares
    ["script", { src: "https://yastatic.net/share2/share.js" }],
  ],
  sitemap: {
    hostname: "https://example.com",
  },
  locales: {
    ...blogConfigBase.locales,
    en: {
      lang: "en-US",
      ...makeCommonTheme(en, "en"),
    },
    // add other languages
  },
  themeConfig: blogConfigBase.themeConfig,
};
