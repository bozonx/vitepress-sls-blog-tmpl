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
import './styles.css'

import Layout from './LayoutIndex.vue'

export default {
  Layout,
  enhanceApp(ctx) {
    ctx.app.component('FileDownload', FileDownload)
    ctx.app.component('AudioFile', AudioFile)
    ctx.app.component('VideoYoutube', VideoYoutube)
  },
}
