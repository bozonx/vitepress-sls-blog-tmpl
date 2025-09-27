<script setup>
import { useData } from 'vitepress'

import Author from '../Author.vue'
import ListPageHeader from '../ListPageHeader.vue'
import PreviewList from './PreviewList.vue'

const { localeIndex, theme } = useData()
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
  <Author :author="author" class="mb-15" />

  <ListPageHeader
    :baseUrl="`/${localeIndex}/${theme.authorBaseUrl}/${props.authorId}`"
  >
    {{ theme.t.allPostsOfAuthor }}
  </ListPageHeader>

  <PreviewList
    :allPosts="sorted"
    :curPage="curPage"
    :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems"
  />
</template>
