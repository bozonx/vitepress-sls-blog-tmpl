import { getImageDimensions } from '../helpers/imageHelpers.js'

/**
 * Плагин для обработки изображений в markdown Автоматически оборачивает
 * изображения в теги <figure> с подписями Аналогичен @mdit/plugin-figure Также
 * собирает размеры изображений и добавляет их как атрибуты
 *
 * Got from @mdit/plugin-figure
 *
 * @param {Object} md - Markdown-it instance
 * @param {Object} options - Опции плагина
 * @param {string} options.srcDir - Путь к директории исходников
 */
export function mdImage(md, { srcDir } = {}) {
  // Обрабатываем изображения, которые стоят отдельно на строке
  md.core.ruler.before('linkify', 'figure', (state) => {
    const tokens = state.tokens

    // Проходим по всем токенам
    for (let i = 1; i < tokens.length - 1; i++) {
      const token = tokens[i]

      // Ищем inline токены (параграфы с содержимым)
      if (
        token.type === 'inline' &&
        token.children &&
        token.children.length > 0
      ) {
        // Проверяем, что это параграф с одним изображением
        const children = token.children
        const prevToken = tokens[i - 1]
        const nextToken = tokens[i + 1]

        // Параграф должен содержать только изображение (или изображение в ссылке)
        const hasOnlyImage =
          (children.length === 1 && children[0].type === 'image') ||
          (children.length === 3 &&
            children[0].type === 'link_open' &&
            children[1].type === 'image' &&
            children[2].type === 'link_close')

        // Предыдущий и следующий токены должны быть paragraph_open и paragraph_close
        const isStandaloneParagraph =
          prevToken.type === 'paragraph_open' &&
          nextToken.type === 'paragraph_close'

        if (hasOnlyImage && isStandaloneParagraph) {
          // Получаем токен изображения
          const imageToken = children.length === 1 ? children[0] : children[1]

          // Получаем путь к изображению
          const imageSrc = imageToken.attrGet('src')

          // Собираем размеры изображения
          if (imageSrc && srcDir) {
            const dimensions = getImageDimensions(imageSrc, srcDir)

            if (dimensions) {
              // Добавляем размеры как data-атрибуты
              imageToken.attrPush(['data-width', dimensions.width.toString()])
              imageToken.attrPush(['data-height', dimensions.height.toString()])
            }
          }

          // Преобразуем paragraph_open в figure_open
          prevToken.type = 'figure_open'
          prevToken.tag = 'figure'
          prevToken.attrSet('class', 'figure')

          // Преобразуем paragraph_close в figure_close
          nextToken.type = 'figure_close'
          nextToken.tag = 'figure'

          // Получаем данные для подписи
          // Используем иначе alt, иначе content
          const caption = imageToken.attrGet('alt') || imageToken.content

          // Добавляем figcaption если есть подпись
          if (caption) {
            // Создаем токены для figcaption
            const figcaptionOpen = new state.Token(
              'figcaption_open',
              'figcaption',
              1
            )
            figcaptionOpen.attrSet('class', 'figure-caption')

            const figcaptionText = new state.Token('text', '', 0)
            figcaptionText.content = caption

            const figcaptionClose = new state.Token(
              'figcaption_close',
              'figcaption',
              -1
            )

            // Добавляем figcaption токены в children
            children.push(figcaptionOpen, figcaptionText, figcaptionClose)
          }

          // Делаем изображение фокусируемым
          imageToken.attrPush(['tabindex', '0'])
        }
      }
    }
  })
}
