import { isAuthorPage } from '../helpers/helpers.js'
import { generatePageUrlPath, isHomePage, isPost } from '../helpers/helpers.js'

/** Add OpenGraph metatags to the page */
export function addOgMetaTags({ page, head, pageData, siteConfig }) {
  // skip root pages
  if (!page || page.indexOf('/') < 0) return

  const siteUrl = siteConfig.userConfig.siteUrl
  const pageUrl = `${siteUrl}/${generatePageUrlPath(page)}`
  const localeIndex = page.split('/')[0]
  const langConfig = siteConfig.site.locales[localeIndex]
  const locale = langConfig.lang.replace('-', '_')
  const isArticle = isPost(pageData.frontmatter)
  const siteName = langConfig.title
  const title = pageData.title || siteName
  const descr =
    isHomePage(pageData.frontmatter) && !pageData.description
      ? langConfig.description
      : pageData.description
  const author =
    pageData.frontmatter.authorId &&
    langConfig.themeConfig.authors?.find(
      (item) => item.id === pageData.frontmatter.authorId
    )?.name
  const img = resolveOgImage(page, pageData, siteConfig, siteUrl, langConfig)

  // Тип контента
  const ogType = isArticle ? 'article' : 'website'
  // Twitter Card теги
  const twitterCardType = img ? 'summary_large_image' : 'summary'

  // Базовые обязательные OpenGraph теги
  head.push(['meta', { property: 'og:site_name', content: siteName }])
  head.push(['meta', { property: 'og:title', content: title }])
  descr && head.push(['meta', { property: 'og:description', content: descr }])
  head.push(['meta', { property: 'og:url', content: pageUrl }])
  head.push(['meta', { property: 'og:locale', content: locale }])
  head.push(['meta', { property: 'og:type', content: ogType }])
  pageData.frontmatter.date &&
    head.push([
      'meta',
      {
        property: 'article:published_time',
        content: pageData.frontmatter.date,
      },
    ])

  // Добавляем время модификации если есть
  pageData.lastUpdated &&
    head.push([
      'meta',
      {
        property: 'article:modified_time',
        content: new Date(pageData.lastUpdated).toISOString(),
      },
    ])

  author && head.push(['meta', { property: 'article:author', content: author }])
  pageData.frontmatter.tags &&
    (pageData.frontmatter.tags || []).forEach((tag) => {
      head.push(['meta', { property: 'article:tag', content: tag.name }])
    })

  if (img) {
    head.push(['meta', { property: 'og:image', content: img.url }])
    img.width &&
      head.push([
        'meta',
        { property: 'og:image:width', content: img.width.toString() },
      ])
    img.height &&
      head.push([
        'meta',
        { property: 'og:image:height', content: img.height.toString() },
      ])
    img.alt &&
      head.push(['meta', { property: 'og:image:alt', content: img.alt }])
  }

  head.push(['meta', { name: 'twitter:card', content: twitterCardType }])
  head.push(['meta', { name: 'twitter:title', content: title }])
  img && head.push(['meta', { name: 'twitter:image', content: img.url }])
  descr && head.push(['meta', { name: 'twitter:description', content: descr }])
  // Twitter Creator (если есть автор)
  author && head.push(['meta', { name: 'twitter:creator', content: author }])
}

export function resolveOgImage(
  page,
  pageData,
  siteConfig,
  siteUrl,
  langConfig
) {
  if (isAuthorPage(page, siteConfig)) {
    const authorId = pageData.params.id
    const author = langConfig.themeConfig.authors.find(
      (item) => item.id === authorId
    )

    if (!author?.image) return

    return {
      url: author.image.match(/\/\//) ? author.image : siteUrl + author.image,
      width: author?.imageWidth,
      height: author?.imageHeight,
      alt: author?.name,
    }
  }

  // post cover
  if (!pageData.frontmatter.cover) return

  const coverUrl = siteUrl + pageData.frontmatter.cover

  return {
    url: coverUrl,
    width: pageData.frontmatter.coverWidth,
    height: pageData.frontmatter.coverHeight,
    alt: pageData.frontmatter.coverAlt,
  }
}
