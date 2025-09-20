import { getFormatInfo, getRssFormats } from '../helpers/rssHelpers.js'
import { isHomePage } from '../helpers/helpers.js'
import { ROOT_LANG } from '../constants.js'

/**
 * Добавляет RSS feed ссылки в head главной страницы
 *
 * @param {Object} context { page, head, pageData, siteConfig }
 */
export function addRssLinks({ page, head, pageData, siteConfig }) {
  // only for index pages line ru/, en/
  if (!isHomePage(pageData.frontmatter)) return

  const hostname = siteConfig.userConfig.hostname
  const localeIndex = page.split('/')[0]
  const supportedLocales = Object.keys(siteConfig.site.locales).filter(
    (locale) => locale !== ROOT_LANG
  )

  // Получаем настройки форматов RSS
  const rssFormats = getRssFormats(siteConfig)

  // Добавляем RSS ссылки для текущего языка
  for (const format of rssFormats) {
    const feedUrl = `${hostname}/feed-${localeIndex}.${format}`
    const formatInfo = getFormatInfo(format)

    head.push([
      'link',
      {
        rel: 'alternate',
        type: formatInfo.mimeType,
        title: `${siteConfig.site.locales[localeIndex].title} - ${formatInfo.title}`,
        href: feedUrl,
        hreflang: localeIndex,
      },
    ])
  }

  // Добавляем альтернативные языки (опционально)
  for (const locale of supportedLocales) {
    if (locale !== localeIndex) {
      // Добавляем только основной формат для альтернативных языков
      const feedUrl = `${hostname}/feed-${locale}.rss`

      head.push([
        'link',
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: `${siteConfig.site.locales[locale].title} - RSS Feed`,
          href: feedUrl,
          hreflang: locale,
        },
      ])
    }
  }
}
