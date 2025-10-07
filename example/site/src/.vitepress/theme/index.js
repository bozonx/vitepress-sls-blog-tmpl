import Tobii from '@midzer/tobii/dist/tobii.modern.js'
import '@midzer/tobii/dist/tobii.min.css'
import { tobiiLightboxPlugin } from 'vitepress-sls-blog-tmpl/tobiiLightboxPlugin.js'
import Layout from './Layout.vue'
import 'vitepress-sls-blog-tmpl/site-tmpl-fix.css'
import 'vitepress-sls-blog-tmpl/search-modal.css'
import 'vitepress-sls-blog-tmpl/pagefind-fix.css'
import { resolveTranslationsByFilePath } from 'vitepress-sls-blog-tmpl/resolveTranslations.js'
import './styles.css'

/** @type {import('vitepress').Theme} */
export default {
  Layout,
  enhanceApp(ctx) {
    ctx.app.config.globalProperties.getLocales = () =>
      resolveTranslationsByFilePath(ctx.router.route.path)

    tobiiLightboxPlugin(ctx, Tobii)
  },
}
