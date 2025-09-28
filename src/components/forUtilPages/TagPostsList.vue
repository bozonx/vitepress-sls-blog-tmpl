<script setup>
import { useData, useRoute } from 'vitepress'

import PreviewList from './PreviewList.vue'
import ListPageHeader from '../ListPageHeader.vue'
import { sortPosts } from '../../helpers/helpers.js'

const { theme, localeIndex, frontmatter } = useData()
const route = useRoute()
const props = defineProps([
  'allPosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
  'tagSlug',
  'tagName',
])
const curPage = Number(props.curPage)
const filtered = props.allPosts.filter((item) =>
  item.tags?.map((item) => item.name).includes(props.tagName)
)
// Проверяем, есть ли в роуте /popular/
const isPopularRoute = route.path.includes(`/${theme.value.popularBaseUrl}/`)
const sorted = sortPosts(
  filtered,
  theme.value.popularPosts?.sortBy,
  isPopularRoute
)
</script>

<template>
  <ListPageHeader
    :baseUrl="`/${localeIndex}/${theme.tagsBaseUrl}/${props.tagSlug}`"
  >
    {{ frontmatter.title }}
  </ListPageHeader>

  <PreviewList
    :allPosts="sorted"
    :curPage="curPage"
    :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems"
  />
</template>
