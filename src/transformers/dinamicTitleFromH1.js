import * as cheerio from 'cheerio'

/**
 * Динамически изменяет мета-тег title на основе первого H1 заголовка в контенте
 *
 * @param {Object} context - Контекст трансформера
 * @param {string} context.page - URL страницы
 * @param {string} context.content - HTML контент страницы
 * @param {Array} context.head - Массив мета-тегов для head
 * @param {Object} context.siteConfig - Конфигурация сайта
 */
export function dinamicTitleFromH1({
  page,
  content,
  pageData,
  head,
  siteConfig,
}) {
  // Проверяем наличие контента
  if (!content || typeof content !== 'string') {
    console.warn('dinamicTitleFromH1: content is missing or not a string')
    return
  }

  try {
    // Парсим HTML контент с помощью cheerio
    const $ = cheerio.load(content)

    // Ищем первый H1 заголовок
    const firstH1 = $('h1').first()

    if (firstH1.length === 0) {
      console.warn('dinamicTitleFromH1: No H1 tag found in content')
      return
    }

    // Извлекаем текст из H1, убираем лишние пробелы
    const h1Text = firstH1.text().trim()

    if (!h1Text) {
      console.warn('dinamicTitleFromH1: H1 tag is empty')
      return
    }

    // Получаем название сайта для формирования полного title
    const langIndex = page?.split('/')[0]
    const langConfig = siteConfig.site.locales[langIndex]
    const siteName = langConfig?.title

    // Формируем новый title: "H1 текст | Название сайта"
    const newTitle = `${h1Text} | ${siteName}`

    pageData.title = newTitle
    pageData.frontmatter.title = newTitle

    // Ищем существующий title тег в head и заменяем его
    let titleReplaced = false

    for (let i = 0; i < head.length; i++) {
      const metaTag = head[i]

      // Проверяем, является ли это title тегом
      if (Array.isArray(metaTag) && metaTag[0] === 'title') {
        head[i] = ['title', {}, newTitle]
        titleReplaced = true
        break
      }
    }

    // Если title тег не найден, добавляем новый
    if (!titleReplaced) {
      head.push(['title', {}, newTitle])
    }
  } catch (error) {
    console.error(
      'dinamicTitleFromH1: Error processing content:',
      error.message
    )
  }
}
