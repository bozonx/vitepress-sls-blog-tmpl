import siteConfigBase from "vitepress-sls-blog-tmpl/src/configs/siteConfigBase.js";
import { loadSiteLocale } from "vitepress-sls-blog-tmpl/src/helpers/siteConfigHelper.js";

const PROPS = {
  // required
  hostname: "https://",
  repo: "https://github.com/",
  editLinkPattern: "https://github.com/bozonx/.../edit/main/src/:path",

  blogUrl: "",
  footerCopyright: "Copyright © 2024-present .",

  // used in links
  donateUrl: "page/donate",
  aboutUrl: "page/about",
  // linksUrl: "page/links",
  docUrl: "doc",
};
const ru = loadSiteLocale("ru", __filename, PROPS);
const en = loadSiteLocale("en", __filename, PROPS);
const configBase = siteConfigBase(PROPS, en);

export default {
  ...configBase,
  locales: {
    ...configBase.locales,
    en: { lang: "en-US", ...en },
    ru: { lang: "ru-RU", ...ru },
  },
};
