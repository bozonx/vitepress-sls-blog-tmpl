<script setup>
import { useData } from "vitepress";
import { Icon } from "@iconify/vue";
import Btn from "../Btn.vue";

const { frontmatter, theme } = useData();
const btnClassName =
  "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700";
//  focus-within:ring-red-300 dark:focus-within:ring-red-900
</script>

<template>
  <Btn :href="frontmatter.videoLink" :text="theme.t.links.postVideoButton" icon="fa6-brands:youtube" target="_blank"
    :class="btnClassName" />
</template>
