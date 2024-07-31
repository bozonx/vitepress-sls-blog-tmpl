---
layout: false
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import { useData, inBrowser } from 'vitepress'
import { onMounted } from 'vue'
import {resolveNavigatorLang} from 'vitepress-sls-blog-tmpl/helpers.js'

const { site } = useData()
const supportedLocales = Object.keys(site.value.locales)
  .filter((item) => item !== 'root')

onMounted(() => {
  if (inBrowser && window.location.pathname === '/') {
    const langToRedirect = resolveNavigatorLang(supportedLocales, navigator.language)
    
    window.location.replace('/' + langToRedirect + '/');
  }
})
</script>
