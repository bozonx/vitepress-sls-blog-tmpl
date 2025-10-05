import 'vitepress/dist/client/theme-default/styles/components/custom-block.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
// see https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/components/vp-doc.css
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import FileDownload from './components/docComponents/FileDownload.vue'
import AudioFile from './components/docComponents/AudioFile.vue'
import VideoYoutube from './components/docComponents/VideoYoutube.vue'
import { initLightbox } from './components/docComponents/lightbox.js'
import { resolveTranslationsByFilePath } from './helpers/resolveTranslations.js'
import './vp-common.css'
import './vp-icons.css'
import './search-modal.css'
import './blog-vars.css'
import './blog-styles.css'

import Layout from './LayoutIndex.vue'

export default {
  Layout,
  enhanceApp(ctx) {
    ctx.app.config.globalProperties.getLocales = () =>
      resolveTranslationsByFilePath(ctx.router.route.path)

    ctx.app.component('FileDownload', FileDownload)
    ctx.app.component('AudioFile', AudioFile)
    ctx.app.component('VideoYoutube', VideoYoutube)
    // Инициализация лайтбокса Tobii с доступом к контексту
    initLightbox(ctx)
  },
}
