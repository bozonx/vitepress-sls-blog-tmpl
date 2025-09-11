import { getImageDimensions } from '../helpers/imageHelpers.js'
import { generatePageUrlPath, isPost } from '../helpers/helpers.js'

/** Add OpenGraph metatags to the page */
export function addOgMetaTags({ page, head, pageData, siteConfig }) {
  // skip root pages
  if (!page || page.indexOf('/') < 0) return

  const hostname = siteConfig.userConfig.hostname
  const pageUrl = `${hostname}/${generatePageUrlPath(page)}`
  const langIndex = page.split('/')[0]
  const langConfig = siteConfig.site.locales[langIndex]
  const locale = langConfig.lang.replace('-', '_')
  const isArticle = isPost(pageData.frontmatter)
  const siteName = langConfig.title
  const title = pageData.title || siteName
  const descr = pageData.description || langConfig.description
  const author =
    pageData.frontmatter.authorId &&
    langConfig.themeConfig.authors?.find(
      (item) => item.id === pageData.frontmatter.authorId
    )?.name
  const img =
    pageData.frontmatter.cover && hostname + pageData.frontmatter.cover
  // Получаем размеры изображения если оно есть
  const imageDimensions =
    pageData.frontmatter.cover &&
    getImageDimensions(pageData.frontmatter.cover, siteConfig.srcDir)
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

  if (isArticle) {
    // Дополнительные теги для статей
    head.push([
      'meta',
      {
        property: 'article:published_time',
        content: pageData.frontmatter.date,
      },
    ])

    // Добавляем время модификации если есть
    pageData.frontmatter.updated &&
      head.push([
        'meta',
        {
          property: 'article:modified_time',
          content: pageData.frontmatter.updated,
        },
      ])

    author &&
      head.push(['meta', { property: 'article:author', content: author }])

    // Теги статьи
    ;(pageData.frontmatter.tags || []).forEach((tag) => {
      head.push(['meta', { property: 'article:tag', content: tag.name }])
    })
  }

  // Изображение
  if (img) {
    head.push(['meta', { property: 'og:image', content: img }])

    // Размеры изображения (приоритет автоматически полученным размерам)
    const imageWidth = imageDimensions?.width || pageData.frontmatter.coverWidth
    const imageHeight =
      imageDimensions?.height || pageData.frontmatter.coverHeight

    if (imageWidth) {
      head.push([
        'meta',
        { property: 'og:image:width', content: imageWidth.toString() },
      ])
    }

    if (imageHeight) {
      head.push([
        'meta',
        { property: 'og:image:height', content: imageHeight.toString() },
      ])
    }

    // Альтернативный текст для изображения
    pageData.frontmatter.coverAlt &&
      head.push([
        'meta',
        { property: 'og:image:alt', content: pageData.frontmatter.coverAlt },
      ])
  }

  head.push(['meta', { name: 'twitter:card', content: twitterCardType }])

  head.push(['meta', { name: 'twitter:title', content: title }])

  descr && head.push(['meta', { name: 'twitter:description', content: descr }])

  img && head.push(['meta', { name: 'twitter:image', content: img }])

  // Twitter Creator (если есть автор)
  author && head.push(['meta', { name: 'twitter:creator', content: author }])
}
