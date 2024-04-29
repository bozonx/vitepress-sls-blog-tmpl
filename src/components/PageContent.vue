<script setup>
import { useData } from 'vitepress'
import PostFooter from './post/PostFooter.vue'
import PostHeader from './post/PostHeader.vue'
import PostDate from './post/PostDate.vue'
import PostTopBar from './post/PostTopBar.vue'

const { frontmatter } = useData()
</script>

<template>
<div v-if="frontmatter.type === 'util'">
  <div class="mt-10 util-page"><Content /></div>
</div>

<article v-else>
  <PostHeader />
  <PostDate />
  <PostTopBar />

  <div
    v-if="frontmatter.type === 'article' && frontmatter.previewText"
    class="mt-10 italic"
  >
    {{frontmatter.previewText}}
  </div>

  <div class="mt-10 vp-doc"><Content /></div>

  <PostFooter />
</article>
</template>

