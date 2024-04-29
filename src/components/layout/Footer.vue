<script setup>
import FooterLink from './FooterLink.vue'
import { useData } from 'vitepress'

const { theme, localeIndex } = useData()
</script>

<template>
<footer class="md:flex w-full items-start text-sm text-gray-500 dark:text-gray-400">

  <slot name="footer-before" />
  
  <div
    v-if="theme.t.footer?.text || theme.t.footer?.copyright"
    class="flex-1 max-md:mb-5 pr-2"
  >
    <div>{{theme.t.footer.text}}</div>
    <div>{{theme.t.footer.copyright}}</div>
  </div>

  <ul v-if="theme.ui.footerLinks?.length" class="flex flex-wrap gap-x-9 items-center">
    <li v-for="item in theme.ui.footerLinks">
      <FooterLink :text="item.text" :href="item.href" />
    </li>
  </ul>

</footer>
</template>

