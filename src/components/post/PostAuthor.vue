<script setup>
import { useData } from 'vitepress'
import BtnLink from '../BtnLink.vue'

const props = defineProps(['class'])
const { frontmatter, theme } = useData()
const themeAuthor = (frontmatter.value.authorId)
  ? theme.value.authors?.find((item) => item.id === frontmatter.value.authorId)
  : undefined
//const authorName = (themeAuthor) ? themeAuthor.name : frontmatter.value.authorName
//const authorLink = (themeAuthor) ? themeAuthor.link : frontmatter.value.authorLink
</script>

<template>
<div v-if="themeAuthor?.name" :class="['flex', props.class]">
  <span class="text-gray-500 mr-2">{{theme.t.author}}: </span>
  <BtnLink v-if="themeAuthor?.link" :href="themeAuthor.link">{{themeAuthor.name}}</BtnLink>
  <span v-else>{{authorName}}</span>
</div>
</template>

