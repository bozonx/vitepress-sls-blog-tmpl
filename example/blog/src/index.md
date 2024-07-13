---
layout: false
---

<script setup>
import { useData, inBrowser } from 'vitepress'
import { watchEffect } from 'vue'
import {resolveNavigatorLang} from 'vitepress-sls-blog-tmpl/src/helpers/helpers.js'

const { site } = useData()
const supportedLocales = Object.keys(site.value.locales)
  .filter((item) => item !== 'root')

watchEffect(() => {
  if (inBrowser && window.location.pathname === '/') {
    const langToRedirect = resolveNavigatorLang(supportedLocales, navigator.language)
    
    window.location.replace('/' + langToRedirect + '/');
  }
})
</script>
