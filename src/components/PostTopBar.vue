<script setup>
import { useData } from 'vitepress'
import VideoLink from './VideoLink.vue'

const { frontmatter } = useData()
</script>

<template v-if="frontmatter.videoLink">
<div class="flex space-x-3 mt-4">
  <VideoLink />
</div>
</template>


<!--   {#if videoLink || podcasts} -->
<!--     <div class="flex space-x-3 mt-4"> -->
<!--       {#if videoLink} -->
<!--         <VideoLink href={videoLink} /> -->
<!--       {/if} -->
<!--       {#if podcasts} -->
<!--         <PodcastSelect {podcasts} /> -->
<!--       {/if} -->
<!--     </div> -->
<!--   {/if} -->
