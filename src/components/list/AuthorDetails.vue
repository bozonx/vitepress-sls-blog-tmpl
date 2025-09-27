<script setup>
import { useData, useRoute } from 'vitepress'

import Author from '../Author.vue'
import ListPageHeader from '../ListPageHeader.vue'
import PreviewList from './PreviewList.vue'
import { sortPosts } from '../../helpers/helpers.js'

const { localeIndex, theme } = useData()
const route = useRoute()
const props = defineProps([
  'allPosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
  'authorId',
])
const curPage = Number(props.curPage)
const items = props.allPosts.filter((post) => post.authorId === props.authorId)
// Проверяем, есть ли в роуте /popular/
const isPopularRoute = route.path.includes(`/${theme.value.popularBaseUrl}/`)
const sorted = sortPosts(
  items,
  theme.value.popularPosts?.sortBy,
  isPopularRoute
)
const author = theme.value.authors.find((item) => item.id === props.authorId)
</script>

<template>
  <Author :author="author" class="mb-15" />

  <ListPageHeader
    :baseUrl="`/${localeIndex}/${theme.authorsBaseUrl}/${props.authorId}`"
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
