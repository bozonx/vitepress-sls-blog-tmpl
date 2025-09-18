import { common } from '../configs/siteConfigBase.js'
import en from '../configs/siteLocalesBase/en.js'
import ru from '../configs/siteLocalesBase/ru.js'
import {
  loadConfigYamlFile,
  parseLocaleSite,
} from '../helpers/parseSiteFileTranslations.js'
import { isExternalUrl } from './helpers.js'
import { standardTemplate } from 'squidlet-lib'

const baseLocales = { en, ru }

export async function loadSiteLocale(lang, configFilePath, PROPS) {
  const baseLocale = baseLocales[lang]
  const params = { lang, PROPS, theme: common.themeConfig, t: baseLocale.t }

  const site = parseLocaleSite(configFilePath, params)
  const sidebar = parseLocaleSidebar(configFilePath, params)
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

export function parseLocaleSidebar(configFilePath, props) {
  const sidebar = loadConfigYamlFile(
    configFilePath,
    `sidebar.${props.lang}.yaml`
  )

  function menuRecursive(items, linkPrePath) {
    for (const item of items) {
      item.text = standardTemplate(item.text, props)

      if (typeof item.link === 'string') {
        item.link = standardTemplate(item.link, props)

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
    const linkPrePath = `/${props.lang}/${key}/`

    newSidebar[linkPrePath] = menuRecursive(sidebar[key], linkPrePath)
  }

  return newSidebar
}
