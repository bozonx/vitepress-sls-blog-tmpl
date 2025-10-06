import Layout from './Layout.vue'
import { initLightbox } from 'vitepress-sls-blog-tmpl/lightbox.js'
import Theme from 'vitepress-sls-blog-tmpl'
import 'vitepress-sls-blog-tmpl/tw-styles.css'
import 'vitepress-sls-blog-tmpl/pagefind-fix.css'
import './styles.css'

export default {
  Layout,
  extends: Theme,
  enhanceApp(ctx) {
    initLightbox(ctx)
  },
}
