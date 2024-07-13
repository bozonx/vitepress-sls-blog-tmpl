import blogConfigBase from "vitepress-sls-blog-tmpl/src/configs/blogConfigBase.js";
import { loadBlogLocale } from "vitepress-sls-blog-tmpl/src/helpers/blogConfigHelper.js";
import { PROPS } from "./props.js";

const ru = loadBlogLocale("ru", __filename, PROPS);
const en = loadBlogLocale("en", __filename, PROPS);
const configBase = blogConfigBase(PROPS, en);

export default {
  ...configBase,
  head: [
    ...configBase.head,
    //head: [['link', {rel: 'stylesheet', href: '/tailwind.css'}]]
  ],
  locales: {
    ...configBase.locales,
    en: { lang: "en-US", ...en },
    ru: { lang: "ru-RU", ...ru },
  },
};
