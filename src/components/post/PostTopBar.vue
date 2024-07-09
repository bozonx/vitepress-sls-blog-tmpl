<script setup>
import { useData } from "vitepress";
import VideoLink from "./VideoLink.vue";
import PodcastDropdown from "./PodcastDropdown.vue";

const { frontmatter } = useData();
const props = defineProps(["class"]);
</script>

<template>
  <div v-if="frontmatter.videoLink" :class="['flex max-sm:flex-col sm:space-x-3 space-y-7', props.class]">
    <VideoLink />
    <PodcastDropdown />
  </div>
</template>
