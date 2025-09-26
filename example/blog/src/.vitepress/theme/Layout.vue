<script setup>
import Theme from 'vitepress-sls-blog-tmpl'
import { provide } from 'vue'
import { data as ruData } from '../../ru/loadPosts.data.js'
import { data as enData } from '../../en/loadPosts.data.js'
import { data as ruPopularPostsData } from '../../ru/loadPopularPosts.data.js'
import { data as enPopularPostsData } from '../../en/loadPopularPosts.data.js'

const posts = { ru: ruData.posts, en: enData.posts }

const popularPosts = {
  ru: ruPopularPostsData.posts,
  en: enPopularPostsData.posts,
}

provide('posts', posts)
provide('popularPosts', popularPosts)

const { Layout } = Theme
</script>

<template>
  <Layout></Layout>
</template>
