<script setup>
import { useData } from "vitepress";
import VideoLink from "./VideoLink.vue";
import PodcastDropdown from "./PodcastDropdown.vue";

const { frontmatter } = useData();
</script>

<template>
  <div v-if="frontmatter.videoLink || frontmatter.podcasts" class="flex max-sm:flex-col sm:gap-x-3 max-sm:gap-y-7">
    <VideoLink />
    <PodcastDropdown />
  </div>
</template>
