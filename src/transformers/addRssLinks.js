import { getFormatInfo, getRssFormats } from '../helpers/rssHelpers.js'
import { isHomePage } from '../helpers/helpers.js'
import { ROOT_LANG } from '../constants.js'

/**
 * Добавляет RSS feed ссылки в head главной страницы
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function addRssLinks(pageData, { siteConfig }) {
  // only for index pages line ru/, en/
  // if (!pageData.filePath.match(/^\w+\/index\.md$/)) return

  if (!isHomePage(pageData.frontmatter)) return

  const hostname = siteConfig.userConfig.hostname
  const langIndex = pageData.filePath.split('/')[0]
  const supportedLocales = Object.keys(siteConfig.site.locales).filter(
    (locale) => locale !== ROOT_LANG
  )

  // Получаем настройки форматов RSS
  const rssFormats = getRssFormats(siteConfig)

  pageData.frontmatter.head ??= []

  // Добавляем RSS ссылки для текущего языка
  for (const format of rssFormats) {
    const feedUrl = `${hostname}/feed-${langIndex}.${format}`
    const formatInfo = getFormatInfo(format)

    pageData.frontmatter.head.push([
      'link',
      {
        rel: 'alternate',
        type: formatInfo.mimeType,
        title: `${siteConfig.site.locales[langIndex].title} - ${formatInfo.title}`,
        href: feedUrl,
        hreflang: langIndex,
      },
    ])
  }

  // Добавляем альтернативные языки (опционально)
  for (const locale of supportedLocales) {
    if (locale !== langIndex) {
      // Добавляем только основной формат для альтернативных языков
      const feedUrl = `${hostname}/feed-${locale}.rss`
      pageData.frontmatter.head.push([
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
