/** Инициализация и управление лайтбоксом Tobii */
export function tobiiLightboxPlugin(ctx, Tobii) {
  if (typeof window === 'undefined') return

  let tobiiInstance = null

  // Инициализация Tobii
  const initTobii = () => {
    if (tobiiInstance) tobiiInstance.destroy()

    const labels = ctx.app.config.globalProperties.getLocales().t.lightbox

    tobiiInstance = new Tobii({
      captions: false,
      navLabel: [labels.prev, labels.next],
      closeLabel: labels.close,
      dialogTitle: labels.dialogTitle,
      loadingIndicatorLabel: labels.loadingIndicatorLabel,
    })
  }

  // Обновляем Tobii при загрузке lazy изображений
  document.addEventListener(
    'load',
    (event) => {
      if (event.target.tagName === 'IMG' && event.target.closest('.lightbox')) {
        initTobii()
      }
    },
    true
  )

  // Отслеживаем добавление новых lightbox элементов
  const observer = new MutationObserver((mutations) => {
    let shouldReinit = false

    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (
              node.classList?.contains('lightbox') ||
              node.querySelector?.('.lightbox')
            ) {
              shouldReinit = true
            }
          }
        })
      }
    })

    if (shouldReinit) {
      initTobii()
    }
  })

  // Начинаем наблюдение за изменениями в body
  observer.observe(document.body, { childList: true, subtree: true })

  // document.addEventListener('DOMContentLoaded', initTobii)

  // Переинициализируем при навигации в VitePress
  // window.addEventListener('popstate', () => {
  //   setTimeout(initTobii, 0)
  // })
}
