import Layout from './Layout.vue'
import { YouTubeEmbed } from '@miletorix/vitepress-youtube-embed'
import '@miletorix/vitepress-youtube-embed/style.css'
import 'vitepress-sls-blog-tmpl/styles.css'
import './styles.css'
import FileDownload from 'vitepress-sls-blog-tmpl/src/components/docComponents/FileDownload.vue'

export default {
  Layout,
  enhanceApp(ctx) {
    ctx.app.component('YouTubeEmbed', YouTubeEmbed)
    ctx.app.component('FileDownload', FileDownload)
  },
}
