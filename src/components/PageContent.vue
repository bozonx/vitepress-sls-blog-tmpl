<script setup>
import { useData } from 'vitepress'
import PostFooter from './PostFooter.vue'
import PostHeader from './PostHeader.vue'
import PostDate from './PostDate.vue'
import PostTopBar from './PostTopBar.vue'

const { page, theme } = useData()
</script>

<template>
<article v-if="page.frontmatter.type === 'article'">
  <PostHeader />
  <PostDate />
  <PostTopBar />

  <div v-if="page.frontmatter.previewText" class="mt-10 italic">
    {{page.frontmatter.previewText}}
  </div>

  <div class="mt-10">
    <Content />
  </div>

  <PostFooter />
</article>

<div v-else-if="page.frontmatter.type === 'post'">
  <PostDate />
  <PostTopBar />
  <Content />
  <PostFooter />
</div>

<div v-else-if="page.frontmatter.type === 'video'">
  <PostHeader />
  <PostDate />
  <PostTopBar />
  <Content />
  <PostFooter />
</div>

<div v-else-if="page.frontmatter.type === 'audio'">
  <PostHeader />
  <PostDate />
  <PostTopBar />
  <Content />
  <PostFooter />
</div>

<div v-else>
  <Content />
</div>
</template>

