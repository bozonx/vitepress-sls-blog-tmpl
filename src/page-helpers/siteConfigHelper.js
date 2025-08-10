import { common } from '../configs/siteConfigBase.js'
import en from '../configs/siteLocalesBase/en.js'
import ru from '../configs/siteLocalesBase/ru.js'
import { isExternalUrl } from '../helpers/helpers.js'
import { stringTemplate } from '../helpers/stringTemplate.js'
import {
  loadConfigYamlFile,
  parseLocaleSite,
} from './parseSiteFileTranslations.js'

const baseLocales = { en, ru }

export function loadSiteLocale(lang, configFilePath, rawProps) {
  const baseLocale = baseLocales[lang]
  const PROPS = { ...rawProps, theme: common.themeConfig, t: baseLocale.t }

  const site = parseLocaleSite(lang, configFilePath, PROPS)
  const sidebar = parseLocaleSidebar(configFilePath, lang, PROPS)
  const { title, description, ...themeConfig } = site

  return {
    label: baseLocale.label,
    search: baseLocale.search,
    title,
    description,
    themeConfig: {
      ...baseLocale.themeConfig,
      ...themeConfig,
      editLink: {
        pattern: `${PROPS.repo}/edit/main/src/:path`,
        ...baseLocale.themeConfig.editLink,
      },
      lastUpdated: {
        ...common.themeConfig.lastUpdated,
        ...baseLocale.themeConfig.lastUpdated,
      },
      sidebar,
      t: baseLocale.t,
    },
  }
}

export function parseLocaleSidebar(configFilePath, lang, rawProps) {
  const PROPS = { ...rawProps, lang }
  const sidebar = loadConfigYamlFile(configFilePath, `sidebar.${lang}.yaml`)

  function menuRecursive(items, linkPrePath) {
    for (const item of items) {
      item.text = stringTemplate(item.text, PROPS)

      if (typeof item.link === 'string') {
        item.link = stringTemplate(item.link, PROPS)

        if (item.link.indexOf('/') !== 0 && !isExternalUrl(item.link)) {
          item.link = linkPrePath + item.link
        }
      }

      if (item.items) {
        item.items = menuRecursive(item.items, linkPrePath)
      }
    }

    return items
  }

  const newSidebar = {}

  for (const key of Object.keys(sidebar)) {
    const linkPrePath = `/${lang}/${key}/`

    newSidebar[linkPrePath] = menuRecursive(sidebar[key], linkPrePath)
  }

  return newSidebar
}
