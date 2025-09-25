import Tobii from '@midzer/tobii/dist/tobii.modern.js'
import '@midzer/tobii/dist/tobii.min.css'
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
// see https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/components/vp-doc.css
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import FileDownload from './components/docComponents/FileDownload.vue'
import AudioFile from './components/docComponents/AudioFile.vue'
import VideoYoutube from './components/docComponents/VideoYoutube.vue'
import './vp-common.css'
import './vp-icons.css'
import './blog-vars.css'
import './blog-styles.css'

import Layout from './LayoutIndex.vue'

export default {
  Layout,
  enhanceApp(ctx) {
    ctx.app.component('FileDownload', FileDownload)
    ctx.app.component('AudioFile', AudioFile)
    ctx.app.component('VideoYoutube', VideoYoutube)

    // Инициализация Tobii на клиенте после загрузки (enhanceApp вызывается только в браузере)
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        // Инициализируем Tobii после полной загрузки DOM и изображений
        const initTobii = () => {
          // Уничтожаем предыдущий экземпляр если он существует
          if (window.tobii) {
            window.tobii.destroy()
          }

          const tobii = new Tobii({
            // Опциональные настройки (см. документацию Tobii)
            // zoomSpeed: 0.15,
            // closeLabel: 'Закрыть',
            // prevLabel: 'Предыдущее',
            // nextLabel: 'Следующее',
          })

          window.tobii = tobii
        }

        // Инициализируем сразу если DOM уже готов
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initTobii)
        } else {
          initTobii()
        }

        // Переинициализируем при навигации в SPA (VitePress)
        window.addEventListener('popstate', () => {
          setTimeout(initTobii, 100) // Небольшая задержка для рендеринга
        })
      }, 2000)
    }
  },
}
