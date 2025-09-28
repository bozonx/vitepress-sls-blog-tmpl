<script setup>
import { useData } from 'vitepress'
import UtilPageHeader from '../UtilPageHeader.vue'
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
const perPage = props.perPage || theme.value.perPage
const paginationMaxItems =
  props.paginationMaxItems || theme.value.paginationMaxItems
const sorted = sortPosts(props.allPosts, theme.value.popularPosts?.sortBy, true)
</script>

<template>
  <UtilPageHeader>{{ frontmatter.title }}</UtilPageHeader>
  <PreviewList
    :allPosts="sorted"
    :curPage="curPage"
    :perPage="perPage"
    :paginationMaxItems="paginationMaxItems"
  />
</template>
