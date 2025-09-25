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
    // Уничтожаем предыдущий экземпляр если он существует
    if (tobiiInstance) {
      try {
        tobiiInstance.destroy()
      } catch (e) {
        console.warn('Error destroying Tobii instance:', e)
      }
    }

    // Проверяем, есть ли lightbox элементы
    const lightboxElements = document.querySelectorAll('.lightbox')
    console.log('Found', lightboxElements.length, 'lightbox elements')
    if (lightboxElements.length === 0) {
      console.log('No lightbox elements found, skipping Tobii initialization')
      return
    }

    try {
      tobiiInstance = new Tobii({
        // Опциональные настройки (см. документацию Tobii)
        // zoomSpeed: 0.15,
        // closeLabel: 'Закрыть',
        // prevLabel: 'Предыдущее',
        // nextLabel: 'Следующее',
      })

      window.tobii = tobiiInstance
      console.log(
        'Tobii initialized successfully with',
        lightboxElements.length,
        'elements'
      )
    } catch (e) {
      console.error('Error initializing Tobii:', e)
    }
  }

  // Функция для обновления Tobii (для lazy loading изображений)
  const refreshTobii = () => {
    if (tobiiInstance) {
      try {
        tobiiInstance.refresh()
        console.log('Tobii refreshed')
      } catch (e) {
        console.warn('Error refreshing Tobii:', e)
      }
    }
  }

  // Инициализируем Tobii
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTobii)
  } else {
    initTobii()
  }

  // Обновляем Tobii при загрузке lazy изображений
  document.addEventListener(
    'load',
    (event) => {
      if (event.target.tagName === 'IMG' && event.target.closest('.lightbox')) {
        refreshTobii()
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
              console.log('New lightbox element detected, reinitializing Tobii')
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
  window.addEventListener('popstate', () => {
    setTimeout(initTobii, 100)
  })

  // Очистка при размонтировании
  window.addEventListener('beforeunload', () => {
    if (tobiiInstance) {
      try {
        tobiiInstance.destroy()
      } catch (e) {
        console.warn('Error destroying Tobii on unload:', e)
      }
    }
    observer.disconnect()
  })

  // Возвращаем функции для внешнего использования
  return {
    init: initTobii,
    refresh: refreshTobii,
    destroy: () => {
      if (tobiiInstance) {
        try {
          tobiiInstance.destroy()
          tobiiInstance = null
        } catch (e) {
          console.warn('Error destroying Tobii:', e)
        }
      }
    },
  }
}
