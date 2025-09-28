<script setup>
import { useData, useRoute } from 'vitepress'
import PreviewList from '../PreviewList.vue'
import ListPageHeader from '../ListPageHeader.vue'
import { sortPosts, isPopularRoute } from '../../helpers/helpers.js'

const { theme, localeIndex, frontmatter } = useData()
const route = useRoute()
const props = defineProps([
  'allPosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
  'tagSlug',
  'tagName',
  'showPopularPostsSwitch',
])
const curPage = Number(props.curPage)
// Фильтруем посты по тегу
const filtered = props.allPosts.filter((item) =>
  item.tags?.map((item) => item.name).includes(props.tagName)
)
const sorted = sortPosts(
  filtered,
  theme.value.popularPosts?.sortBy,
  isPopularRoute(route.path, theme)
)
</script>

<template>
  <ListPageHeader
    :baseUrl="`/${localeIndex}/${theme.tagsBaseUrl}/${props.tagSlug}`"
    :showPopularPostsSwitch="showPopularPostsSwitch"
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
