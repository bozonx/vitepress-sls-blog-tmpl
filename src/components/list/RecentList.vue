<script setup>
import { useData } from 'vitepress'

import PreviewList from './PreviewList.vue'

const { theme } = useData()
const props = defineProps([
  'allData',
  'curPage',
  'perPage',
  'paginationMaxItems',
])
const curPage = Number(props.curPage)
const sorted = [...(props.allData || [])].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
)
</script>

<template>
  <PreviewList
    :allData="sorted"
    :curPage="curPage"
    :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems"
    :paginationBaseUrl="theme.recentBaseUrl"
  />
</template>
