import { common } from '../configs/blogConfigBase.js'
import en from '../configs/blogLocalesBase/en.js'
import ru from '../configs/blogLocalesBase/ru.js'
import { parseLocaleSite } from './parseSiteFileTranslations.js'
import { mdToHtml } from './mdWorks.js'

const baseLocales = { en, ru }

export function loadBlogLocale(lang, configFilePath, PROPS) {
  const baseLocale = baseLocales[lang]
  const site = parseLocaleSite(lang, configFilePath, {
    ...PROPS,
    theme: common.themeConfig,
    t: baseLocale.t,
  })
  const { title, description, t, ...themeConfig } = site

  const authors = themeConfig.authors?.map((item) => {
    return { ...item, descr: mdToHtml(item.descr) }
  })
  const postDonateCall = mdToHtml(themeConfig.postDonateCall)

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
      postDonateCall,
      t: { ...baseLocale.t, ...t },
    },
  }
}
