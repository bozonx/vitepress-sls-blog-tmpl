<script setup>
import { useData } from 'vitepress'

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
  <div class="mb-12 vp-doc" v-html="author?.descr"></div>

  <UtilPageHeader>{{ theme.t.allPostsOfAuthor }}</UtilPageHeader>

  <PreviewList
    :allData="sorted"
    :curPage="curPage"
    :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems"
    :paginationBaseUrl="`${theme.authorBaseUrl}/${props.authorId}`"
  />
</template>
