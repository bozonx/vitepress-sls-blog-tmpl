<script setup>
import BtnLink from "../BtnLink.vue";
import { useData } from "vitepress";

const { theme, localeIndex } = useData();
</script>

<template>
  <footer v-if="theme.footer" class="flex max-md:flex-col-reverse gap-x-2 w-full items-start text-sm muted">
    <slot name="footer-before" />

    <div v-if="theme.footer?.message || theme.footer?.copyright" class="flex-1 max-md:mt-5">
      <div>{{ theme.footer.message }}</div>
      <div>{{ theme.footer.copyright }}</div>
    </div>

    <ul v-if="theme.footer.links?.length" class="flex flex-wrap gap-x-9 items-center">
      <li v-for="item in theme.footer.links">
        <BtnLink :text="item.text" :href="item.href" class="underline" />
      </li>
    </ul>
  </footer>
</template>
