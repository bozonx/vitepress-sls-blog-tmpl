import 'vitepress/dist/client/theme-default/styles/components/custom-block.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
// see https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/components/vp-doc.css
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import { YouTubeEmbed } from '@miletorix/vitepress-youtube-embed'
import FileDownload from './components/docComponents/FileDownload.vue'
import './vp-common.css'
import './vp-icons.css'
import './styles.css'

import Layout from './LayoutIndex.vue'

export default {
  Layout,
  enhanceApp(ctx) {
    ctx.app.component('YouTubeEmbed', YouTubeEmbed)
    ctx.app.component('FileDownload', FileDownload)
  },
}
