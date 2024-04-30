<script setup>
import { useData } from 'vitepress'
import PostFooter from './post/PostFooter.vue'
import PostDate from './post/PostDate.vue'
import PostTopBar from './post/PostTopBar.vue'

const { theme, frontmatter } = useData()
const articlePreviewText = frontmatter.previewText || frontmatter.description
const showArticlePreview = frontmatter.type === 'article'
  && articlePreviewText
  && theme.value.showArticlePreview
</script>

<template>
<div v-if="frontmatter.type === 'util'">
  <h1>{{frontmatter.title}}</h1>
  <div class="mt-10 util-page"><Content /></div>
</div>
<article v-else>
  <h1
    v-if="frontmatter.title"
    class="text-4xl max-md:text-2xl mb-5 tracking-tight"
  >{{frontmatter.title}}</h1>
  <PostDate class="mt-6"/>
  <PostTopBar class="mt-6" />

  <div v-if="showArticlePreview" class="mt-10 italic">
    {{articlePreviewText}}
  </div>

  <div class="mt-10 vp-doc"><Content /></div>

  <PostFooter />
</article>
</template>

