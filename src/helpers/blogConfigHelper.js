import path from 'path'
import { common } from '../configs/blogConfigBase.js'
import en from '../configs/blogLocalesBase/en.js'
import ru from '../configs/blogLocalesBase/ru.js'
import { parseLocaleSite } from './parseSiteFileTranslations.js'
import { mdToHtml } from './mdWorks.js'
import { getImageDimensions } from './imageHelpers.js'

const baseLocales = { en, ru }

export async function loadBlogLocale(localeIndex, configFilePath, PROPS) {
  const baseLocale = baseLocales[localeIndex]
  const srcDir = path.resolve(configFilePath, '../../')
  const site = parseLocaleSite(configFilePath, {
    localeIndex,
    PROPS,
    theme: common.themeConfig,
    t: baseLocale.t,
  })
  const { title, description, t, ...themeConfig } = site

  const authors = themeConfig.authors?.map((item) => {
    let imageDimensions = null
    if (item.image) {
      imageDimensions = getImageDimensions(item.image, srcDir)
      item.imageHeight = imageDimensions?.height
      item.imageWidth = imageDimensions?.width
    }

    return {
      ...item,
      descr: mdToHtml(item.descr),
      imageHeight: imageDimensions?.height,
      imageWidth: imageDimensions?.width,
    }
  })

  return {
    label: baseLocale.label,
    title,
    description,
    themeConfig: {
      ...baseLocale.themeConfig,
      ...themeConfig,
      editLink: {
        pattern: `${PROPS.repo}/edit/main/src/:path`,
        ...baseLocale.themeConfig.editLink,
      },
      authors,
      t: { ...baseLocale.t, ...t },
    },
  }
}
