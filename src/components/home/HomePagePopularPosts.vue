<script setup>
import { inject } from 'vue'
import { useData } from 'vitepress'
import PopularPostsList from '../list/PopularPostsList.vue'

const { localeIndex, theme } = useData()
const popularPosts = inject('popularPosts')
</script>

<template>
  <PopularPostsList
    v-if="theme.popularPosts?.enabled"
    :popularPosts="popularPosts[localeIndex]"
  />
</template>
