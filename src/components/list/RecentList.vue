<script setup>
import { useData } from 'vitepress'
import UtilPageHeader from '../UtilPageHeader.vue'
import PreviewList from './PreviewList.vue'

const { frontmatter } = useData()
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
  <UtilPageHeader>{{ frontmatter.title }}</UtilPageHeader>
  <PreviewList
    :allPosts="sorted"
    :curPage="curPage"
    :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems"
  />
</template>
