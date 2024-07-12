<script setup>
import BtnLink from "../BtnLink.vue";
import { useData } from "vitepress";

const { theme, localeIndex } = useData();
</script>

<template>
  <footer v-if="theme.footer" class="md:flex w-full items-start text-sm text-gray-500 dark:text-gray-400">
    <slot name="footer-before" />

    <div v-if="theme.footer?.text || theme.footer?.copyright" class="flex-1 max-md:mb-5 pr-2">
      <div>{{ theme.footer.text }}</div>
      <div>{{ theme.footer.copyright }}</div>
    </div>

    <ul v-if="theme.footer.links?.length" class="flex flex-wrap gap-x-9 items-center">
      <li v-for="item in theme.footer.links">
        <BtnLink :text="item.text" :href="item.href" class="underline" />
      </li>
    </ul>
  </footer>
</template>
