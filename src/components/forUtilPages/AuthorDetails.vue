<script setup>
import { useData, useRoute } from 'vitepress'
import Author from '../Author.vue'
import ListPageHeader from '../ListPageHeader.vue'
import PreviewList from '../PreviewList.vue'
import { sortPosts, isPopularRoute } from '../../helpers/helpers.js'
import UtilPageHeader from './UtilPageHeader.vue'

const { localeIndex, theme, frontmatter } = useData()
const route = useRoute()
const props = defineProps([
  'allPosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
  'authorId',
  'showPopularPostsSwitch',
])
const curPage = Number(props.curPage)
// Фильтруем посты по автору
const filtered = props.allPosts.filter(
  (post) => post.authorId === props.authorId
)
const sorted = sortPosts(
  filtered,
  theme.value.popularPosts?.sortBy,
  isPopularRoute(route.path, theme)
)
const author = theme.value.authors.find((item) => item.id === props.authorId)
</script>

<template>
  <UtilPageHeader>{{ frontmatter.title }}</UtilPageHeader>
  <Author :author="author" class="mb-15" />

  <ListPageHeader
    :baseUrl="`/${localeIndex}/${theme.authorsBaseUrl}/${props.authorId}`"
    :showPopularPostsSwitch="showPopularPostsSwitch"
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
