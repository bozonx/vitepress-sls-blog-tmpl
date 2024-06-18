<script setup>
import { useData } from 'vitepress'
import { POST_TYPES } from '../constants.js'
import PostFooter from './post/PostFooter.vue'
import PostDate from './post/PostDate.vue'
import PostTopBar from './post/PostTopBar.vue'

const { theme, page, frontmatter } = useData()
const articlePreviewText = (theme.value.useDescriptionForArticlePreview)
  ? frontmatter.value.previewText || frontmatter.value.description
  : frontmatter.value.previewText
const showArticlePreview = frontmatter.value.type === POST_TYPES.article
  && articlePreviewText
  && theme.value.showArticlePreview
</script>

<template>
<div v-if="frontmatter.type === 'util'">
  <!-- <h1 v-if="page.title">{{page.title}}</h1> -->
  <div class="util-page"><Content /></div>
</div>
<article v-else>
  <template v-if="frontmatter.type">
    <h1
      v-if="page.title"
      class="text-4xl max-md:text-2xl mb-5 tracking-tight"
    >{{page.title}}</h1>
    
    <PostDate class="mt-6"/>
    <PostTopBar class="mt-6" />

    <div v-if="showArticlePreview" class="mt-10 italic">
      {{articlePreviewText}}
    </div>
  </template>

  <div class="mt-10 vp-doc"><Content /></div>

  <PostFooter />
</article>
</template>

