import path from 'path'
import { parseLocaleSite } from './parseSiteFileTranslations.js'
import { mdToHtml } from './mdWorks.js'
import { getImageDimensions } from './imageHelpers.js'
import { common } from '../configs/blogConfigBase.js'
import en from '../configs/blogLocalesBase/en.js'
import ru from '../configs/blogLocalesBase/ru.js'

export const baseLocales = { en, ru }

export async function loadBlogLocale(localeIndex, config) {
  const baseLocale = baseLocales[localeIndex]
  const params = {
    localeIndex,
    config,
    theme: { ...common.themeConfig, ...config.themeConfig },
    t: baseLocale.t,
  }
  const site = parseLocaleSite(config.srcDir, params)
  const { lang, title, description, t, editLink, ...themeConfig } = site

  const authors = themeConfig.authors?.map((item) => {
    let imageDimensions = item.image
      ? getImageDimensions(item.image, config.srcDir)
      : null

    return {
      ...item,
      descr: mdToHtml(item.descr),
      imageHeight: imageDimensions?.height,
      imageWidth: imageDimensions?.width,
    }
  })

  return {
    lang,
    label: baseLocale.label,
    title,
    description,
    themeConfig: {
      ...baseLocale.themeConfig,
      ...themeConfig,
      editLink: {
        pattern: `${config.repo}/edit/main/src/:path`,
        ...baseLocale.themeConfig.editLink,
        ...editLink,
      },
      t: { ...baseLocale.t, ...t },
      authors,
    },
  }
}
