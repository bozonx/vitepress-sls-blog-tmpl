<script setup>
import { useData } from 'vitepress'

import Author from '../Author.vue'
import UtilPageHeader from '../UtilPageHeader.vue'
import PreviewList from './PreviewList.vue'

const { theme } = useData()
const props = defineProps([
  'allPosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
  'authorId',
])
const curPage = Number(props.curPage)
const items = props.allPosts.filter((post) => post.authorId === props.authorId)
const sorted = [...(items || [])].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
)
const author = theme.value.authors.find((item) => item.id === props.authorId)
</script>

<template>
  <Author :author="author" />

  <UtilPageHeader>{{ theme.t.allPostsOfAuthor }}</UtilPageHeader>

  <PreviewList
    :allPosts="sorted"
    :curPage="curPage"
    :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems"
    :paginationBaseUrl="`${theme.authorBaseUrl}/${props.authorId}`"
  />
</template>
