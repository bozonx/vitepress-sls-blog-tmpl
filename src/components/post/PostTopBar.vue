<script setup>
import { useData } from 'vitepress'
import VideoLink from './VideoLink.vue'

const { frontmatter } = useData()
const props = defineProps(['class'])
</script>

<template>
<div v-if="frontmatter.youtubeLink" :class="['flex space-x-3', props.class]">
  <VideoLink />
</div>
</template>

