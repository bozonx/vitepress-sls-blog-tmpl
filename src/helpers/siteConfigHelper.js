import lodashTemplate from "lodash.template";
import { isExternalUrl } from "./helpers.js";
import {
  parseLocaleSite,
  loadConfigYamlFile,
} from "./parseSiteFileTranslations.js";
import { common } from "../configs/siteConfigBase.js";
import en from "../configs/siteLocalesBase/en.js";
import ru from "../configs/siteLocalesBase/ru.js";

const baseLocales = {
  en,
  ru,
};

export function loadSiteLocale(lang, configFilePath, rawProps) {
  const PROPS = {
    ...rawProps,
    theme: common.themeConfig,
  };

  const site = parseLocaleSite(lang, configFilePath, PROPS);
  const sidebar = parseLocaleSidebar(configFilePath, lang, PROPS);
  const baseLocale = baseLocales[lang];
  const { title, description, ...themeConfig } = site;

  return {
    ...baseLocale,
    title,
    description,
    themeConfig: {
      ...baseLocale.themeConfig,
      ...themeConfig,
      editLink: {
        pattern: PROPS.editLinkPattern,
        ...baseLocale.themeConfig.editLink,
      },
      lastUpdated: {
        ...common.themeConfig.lastUpdated,
        ...baseLocale.themeConfig.lastUpdated,
      },
      sidebar,
    },
  };
}

export function parseLocaleSidebar(configFilePath, lang, rawProps) {
  const PROPS = {
    ...rawProps,
    lang,
  };
  const sidebar = loadConfigYamlFile(configFilePath, `sidebar.${lang}.yaml`);

  function menuRecursive(items, linkPrePath) {
    for (const item of items) {
      item.text = lodashTemplate(item.text)({ PROPS });

      if (typeof item.link === "string") {
        item.link = lodashTemplate(item.link)({ PROPS });

        if (item.link.indexOf("/") !== 0 && !isExternalUrl(item.link)) {
          item.link = linkPrePath + item.link;
        }
      }

      if (item.items) {
        item.items = menuRecursive(item.items, linkPrePath);
      }
    }

    return items;
  }

  const newSidebar = {};

  for (const key of Object.keys(sidebar)) {
    const linkPrePath = `/${lang}/${key}/`;

    newSidebar[linkPrePath] = menuRecursive(sidebar[key], linkPrePath);
  }

  return newSidebar;
}
