/**
 * Плагин для обработки изображений в markdown Автоматически оборачивает
 * изображения в теги <figure> с подписями Аналогичен @mdit/plugin-figure
 */
export function mdImage(md) {
  console.log('mdImage: Plugin initialized')

  // Обрабатываем изображения, которые стоят отдельно на строке
  md.core.ruler.before('linkify', 'figure', (state) => {
    console.log('mdImage: Processing tokens, count:', state.tokens.length)
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

          // Преобразуем paragraph_open в figure_open
          prevToken.type = 'figure_open'
          prevToken.tag = 'figure'
          prevToken.attrSet('class', 'figure')

          // Преобразуем paragraph_close в figure_close
          nextToken.type = 'figure_close'
          nextToken.tag = 'figure'

          // Получаем подпись из title или alt
          const title = imageToken.attrGet('title')
          const alt = imageToken.attrGet('alt')
          const caption = title || alt || imageToken.content

          console.log('mdImage: Caption data:', { title, alt, caption })

          // Удаляем title и alt атрибуты, если они есть (чтобы не дублировать в подписи)
          if (title || alt) {
            imageToken.attrs =
              imageToken.attrs?.filter(
                ([key]) => key !== 'title' && key !== 'alt'
              ) || null
          }

          // Добавляем figcaption если есть подпись
          if (caption) {
            console.log('mdImage: Adding figcaption with caption:', caption)

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
