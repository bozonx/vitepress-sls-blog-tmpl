<script setup>
import { useData } from 'vitepress'

import PreviewList from './PreviewList.vue'
import ListPageHeader from '../ListPageHeader.vue'

const { theme, localeIndex, frontmatter } = useData()
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
const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
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
