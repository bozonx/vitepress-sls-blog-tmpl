<script setup>
import { useData } from 'vitepress'
import { inject } from 'vue'
import UtilPageHeader from './UtilPageHeader.vue'
import PreviewList from '../PreviewList.vue'

const { frontmatter, localeIndex } = useData()
const props = defineProps([
  'localePosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
])
const allPosts = inject('posts')
const localePosts = props.localePosts || allPosts[localeIndex.value]
const curPage = Number(props.curPage)
const sorted = [...(localePosts || [])].sort(
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
