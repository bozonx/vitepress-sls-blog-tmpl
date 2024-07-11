<script setup>
import { useData } from "vitepress";
import { Icon } from "@iconify/vue";
import Btn from "../Btn.vue";

const { frontmatter, theme } = useData();
const text =
  theme.value.t.links.postVideoButton +
  (frontmatter.value.videoLinkLang
    ? ` (${frontmatter.value.videoLinkLang})`
    : "");
</script>

<template>
  <Btn :href="frontmatter.videoLink" :text="text" icon="fa6-brands:youtube" target="_blank"
    class="bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 video-link" hideExternalIcon="true" />
</template>

<style>
.video-link {
  color: white !important;
}
</style>
