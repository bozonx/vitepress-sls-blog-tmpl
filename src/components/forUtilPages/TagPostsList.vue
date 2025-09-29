<script setup>
import { useData, useRoute } from 'vitepress'
import { inject } from 'vue'
import PreviewList from '../PreviewList.vue'
import ListPageHeader from '../ListPageHeader.vue'
import { sortPosts, isPopularRoute } from '../../helpers/helpers.js'

const props = defineProps([
  'localePosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
  'tagSlug',
  'tagName',
  'showPopularPostsSwitch',
])
const { theme, localeIndex, frontmatter } = useData()
const route = useRoute()
const allPosts = inject('posts')
const localePosts = props.localePosts || allPosts[localeIndex.value]
const curPage = Number(props.curPage)
// Фильтруем посты по тегу
const filtered = localePosts.filter((item) =>
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
    :localePosts="sorted"
    :curPage="curPage"
    :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems"
  />
</template>
