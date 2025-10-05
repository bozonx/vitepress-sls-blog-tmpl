<script setup>
import Theme from 'vitepress-sls-blog-tmpl'
import NavSearchButton from 'vitepress-sls-blog-tmpl/NavSearchButton.vue'
import PageFindSearch from 'vitepress-sls-blog-tmpl/PageFindSearch.vue'
import { provide } from 'vue'
import { data as enData } from '../../en/loadPosts.data.js'

const posts = { en: enData.posts }

provide('posts', posts)

const { Layout } = Theme
</script>

<template>
  <Layout>
    <!-- <template #aside> test </template> -->
    <template #nav-bar-content-before>
      <PageFindSearch>
        <NavSearchButton />
      </PageFindSearch>
    </template>
  </Layout>
</template>
