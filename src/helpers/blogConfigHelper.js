import { mdToHtml } from "./convertMd.js";
import { parseLocaleSite } from "./parseSiteFileTranslations.js";
import { common } from "../configs/blogConfigBase.js";
import en from "../configs/blogLocalesBase/en.js";
import ru from "../configs/blogLocalesBase/ru.js";

const baseLocales = {
  en,
  ru,
};

export function loadBlogLocale(lang, configFilePath, PROPS) {
  const baseLocale = baseLocales[lang];
  const site = parseLocaleSite(lang, configFilePath, {
    ...PROPS,
    theme: common.themeConfig,
    t: baseLocale.t,
  });
  const { title, description, t, ...themeConfig } = site;

  const authors = themeConfig.authors.map((item) => {
    return {
      ...item,
      descr: mdToHtml(item.descr),
    };
  });
  const postDonateCall = mdToHtml(themeConfig.postDonateCall);

  return {
    ...baseLocale,
    title,
    description,
    themeConfig: {
      ...baseLocale.themeConfig,
      ...themeConfig,
      authors,
      postDonateCall,
      t: {
        ...baseLocale.t,
        ...t,
      },
    },
  };
}
