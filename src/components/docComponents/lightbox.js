import Tobii from '@midzer/tobii/dist/tobii.modern.js'
import '@midzer/tobii/dist/tobii.min.css'
import en from '../../configs/blogLocalesBase/en.js'
import ru from '../../configs/blogLocalesBase/ru.js'

const locales = { en, ru }

/** Получение локализованных строк для лайтбокса из контекста VitePress */
function getLightboxLabels(ctx) {
  if (!ctx || !ctx.router || !ctx.router.route) return

  // Получаем filePath из контекста роутера
  const filePath = ctx.router.route.path
  const segments = filePath?.split('/').filter(Boolean)
  const localeIndex = segments[0]
  const currentLocale = locales[localeIndex]

  if (!locales[localeIndex]) return

  const labels = currentLocale.t.lightbox

  return {
    navLabel: [labels.prev, labels.next],
    closeLabel: labels.close,
    dialogTitle: labels.dialogTitle,
    loadingIndicatorLabel: labels.loadingIndicatorLabel,
  }
}

/** Инициализация и управление лайтбоксом Tobii */
export function initLightbox(ctx) {
  if (typeof window === 'undefined') {
    return
  }

  let tobiiInstance = null

  // Инициализация Tobii
  const initTobii = () => {
    if (tobiiInstance) tobiiInstance.destroy()

    tobiiInstance = new Tobii({ captions: false, ...getLightboxLabels(ctx) })
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
