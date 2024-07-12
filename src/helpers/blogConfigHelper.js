import { parseLocaleSite } from "./parseSiteFileTranslations.js";
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
    t: baseLocale.t,
  });
  const { title, description, t, ...themeConfig } = site;

  return {
    ...baseLocale,
    title,
    description,
    themeConfig: {
      ...baseLocale.themeConfig,
      ...themeConfig,
      t: {
        ...baseLocale.t,
        ...t,
      },
    },
  };
}
