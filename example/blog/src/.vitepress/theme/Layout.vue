<script setup>
import Theme from 'vitepress-sls-blog-tmpl'
import { provide } from 'vue'
import { data as enData } from '../../en/loadPosts.data.js'

const posts = { en: enData.posts }

provide('posts', posts)

const { Layout } = Theme
</script>

<template>
  <Layout></Layout>
</template>
