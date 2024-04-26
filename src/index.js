//import DefaultTheme from 'vitepress/theme'
import Layout from './LayoutIndex.vue'
import './styles.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'

/** @type {import('vitepress').Theme} */
export default {
  //extends: DefaultTheme,
  // enhanceApp({ app }) {
  //   // register your custom global components
  //   app.component('MyGlobalComponent' /* ... */)
  // }
  Layout,
}
 
