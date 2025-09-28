<script setup>
import { useData } from 'vitepress'
import UtilPageHeader from './UtilPageHeader.vue'
import PreviewList from '../PreviewList.vue'
import { sortPosts } from '../../helpers/helpers.js'

const props = defineProps([
  'allPosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
])
const { frontmatter, theme } = useData()
const curPage = Number(props.curPage)
const sorted = sortPosts(props.allPosts, theme.value.popularPosts?.sortBy, true)
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
