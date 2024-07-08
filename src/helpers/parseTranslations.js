import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import lodashTemplate from "lodash.template";
import { DEFAULT_ENCODE } from "../constants.js";
import { isExternalUrl } from "./helpers.js";
import { common } from "../configs/siteConfigBase.js";
import siteEn from "../configs/siteLocalesBase/en.js";
import siteRu from "../configs/siteLocalesBase/ru.js";

const siteBaseLocales = {
  en: siteEn,
  ru: siteRu,
};
const SITE_DIR_REL_PATH = "../site";

export function loadSiteLocale(lang, configFilePath, PROPS) {
  const site = parseLocaleSite(configFilePath, PROPS, lang);
  const sidebar = parseLocaleSidebar(configFilePath, lang);
  const baseLocale = siteBaseLocales[lang];
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

export function parseLocaleSidebar(configFilePath, lang) {
  const relPath = path.join(SITE_DIR_REL_PATH, `sidebar.${lang}.yaml`);
  const absPath = path.resolve(path.dirname(configFilePath), relPath);
  const content = fs.readFileSync(absPath, DEFAULT_ENCODE);
  const obj = yaml.load(content);
  const sidebar = yaml.load(obj.body);

  function menuRecursive(items, linkPrePath) {
    for (const item of items) {
      if (
        typeof item.link === "string" &&
        item.link.indexOf("/") !== 0 &&
        !isExternalUrl(item.link)
      ) {
        item.link = linkPrePath + item.link;
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

export function parseLocaleSite(configFilePath, rawProps, lang) {
  const PROPS = {
    ...rawProps,
    lang,
  };
  const relPath = path.join(SITE_DIR_REL_PATH, `site.${lang}.yaml`);
  const absPath = path.resolve(path.dirname(configFilePath), relPath);
  const content = fs.readFileSync(absPath, DEFAULT_ENCODE);
  const obj = yaml.load(content);
  const translations = yaml.load(obj.body);

  function transRecursive(items) {
    if (Array.isArray(items)) {
      for (const index in items) {
        items[index] = transRecursive(items[index]);
      }

      return items;
    } else if (typeof items === "object") {
      for (const index of Object.keys(items)) {
        items[index] = transRecursive(items[index]);
      }

      return items;
    } else if (typeof items === "string") {
      return lodashTemplate(items)({ PROPS });
    }

    return items;
  }

  return transRecursive(translations);
}
