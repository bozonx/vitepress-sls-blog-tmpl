import Tobii from '@midzer/tobii/dist/tobii.modern.js'
import '@midzer/tobii/dist/tobii.min.css'
import { tobiiLightboxPlugin } from 'vitepress-sls-blog-tmpl/tobiiLightboxPlugin.js'
import 'vitepress-sls-blog-tmpl/blue-theme.css'
import Layout from './Layout.vue'
import Theme from 'vitepress-sls-blog-tmpl'
import 'vitepress-sls-blog-tmpl/tw-styles.css'
import 'vitepress-sls-blog-tmpl/pagefind-fix.css'

import './styles.css'

export default {
  Layout,
  extends: Theme,
  enhanceApp(ctx) {
    tobiiLightboxPlugin(ctx, Tobii)
  },
}
