<script setup>
import { useData } from 'vitepress'

import PreviewList from './PreviewList.vue'

const { theme } = useData()
const props = defineProps([
  'allPosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
])
const curPage = Number(props.curPage)
const sorted = [...(props.allPosts || [])].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
)
</script>

<template>
  <PreviewList
    :allPosts="sorted"
    :curPage="curPage"
    :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems"
    :paginationBaseUrl="theme.recentBaseUrl"
  />
</template>
