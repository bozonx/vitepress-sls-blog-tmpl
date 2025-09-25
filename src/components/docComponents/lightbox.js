import Tobii from '@midzer/tobii/dist/tobii.modern.js'
import '@midzer/tobii/dist/tobii.min.css'

/** Инициализация и управление лайтбоксом Tobii */
export function initLightbox() {
  if (typeof window === 'undefined') {
    return
  }

  let tobiiInstance = null

  // Инициализация Tobii
  const initTobii = () => {
    if (tobiiInstance) tobiiInstance.destroy()

    tobiiInstance = new Tobii({
      captions: false,
      // navLabel: ['Предыдущее', 'Следующее'],
      // closeLabel: 'Закрыть',
      // dialogTitle: 'Изображение',
      // loadingIndicatorLabel: 'Загрузка...',
    })
  }

  // document.addEventListener('DOMContentLoaded', initTobii)

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

  // Переинициализируем при навигации в VitePress
  // window.addEventListener('popstate', () => {
  //   setTimeout(initTobii, 0)
  // })
}
