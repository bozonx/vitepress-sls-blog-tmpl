<script setup>
import { useData } from "vitepress";
import VideoLink from "./VideoLink.vue";

const { frontmatter } = useData();
const props = defineProps(["class"]);
</script>

<template>
  <div v-if="frontmatter.videoLink" :class="['flex space-x-3', props.class]">
    <VideoLink />
  </div>
</template>
