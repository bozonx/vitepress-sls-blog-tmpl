<script setup>
import { inject } from 'vue'
import { useData } from 'vitepress'
import PopularPostsList from '../list/PopularPostsList.vue'

const { localeIndex } = useData()
const posts = inject('posts')
</script>

<template>
  <PopularPostsList :allPosts="posts[localeIndex]" />
</template>
