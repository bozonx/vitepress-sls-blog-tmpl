<script setup>
import { useData } from "vitepress";
import { Icon } from "@iconify/vue";
import BtnLink from "../BtnLink.vue";

const { frontmatter, theme } = useData();
// const className =
//   "text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center justify-center px-4 py-2 text-sm text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus-within:ring-red-300 dark:focus-within:ring-red-900 rounded-lg";
const btnClassName =
  "px-4 py-2 text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus-within:ring-red-300 dark:focus-within:ring-red-900 rounded-lg";
</script>

<template>
  <!-- <a :href="frontmatter.youtubeLink" target="_blank" :class="className"> -->
  <!--   <span class="mr-2"> -->
  <!--     <Icon icon="fa6-brands:youtube" /> -->
  <!--   </span> -->
  <!--   {{ theme.t.links.postYoutubeButton }} -->
  <!-- </a> -->

  <BtnLink :href="frontmatter.videoLink" :text="theme.t.links.postVideoButton" icon="fa6-brands:youtube" target="_blank"
    :class="btnClassName" />
</template>
