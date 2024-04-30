<script setup>
import { useData } from 'vitepress'
import BtnLink from '../BtnLink.vue'

const props = defineProps(['class'])
const { theme, frontmatter } = useData()
</script>

<template>
<div v-if="frontmatter.commentUrl" :class="props.class">
  <BtnLink
    :href="frontmatter.commentUrl"
    :text="theme.t.links.commentCall"
    target="_blank"
    icon="fa6-solid:comment-dots"
    class="underline"
  />
</div>
</template>

