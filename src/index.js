import DefaultTheme from 'vitepress/theme'
import Layout from './LayoutIndex.vue'
import './styles.css'


/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  // enhanceApp({ app }) {
  //   // register your custom global components
  //   app.component('MyGlobalComponent' /* ... */)
  // }
  Layout,
}
 
