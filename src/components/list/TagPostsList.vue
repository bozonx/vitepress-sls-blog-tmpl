<script setup>
import { useData } from 'vitepress'
import PreviewList from './PreviewList.vue'
import { makePostOfMonthList } from '../../helpers/listHelpers.js'

const { theme } = useData()
const props = defineProps([
  'allData',
  'curPage',
  'perPage',
  'paginationMaxItems',
  'tagSlug',
  'tagName',
  'class',
])
const curPage = Number(props.curPage)
const filtered = props.allData.filter((item) => item.tags?.includes(props.tagName))
const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
</script>

<template>
<PreviewList
  :allData="sorted"
  :curPage="curPage"
  :perPage="props.perPage"
  :paginationMaxItems="props.paginationMaxItems"
  :paginationBaseUrl="`${theme.tagsBaseUrl}/${props.tagSlug}`"
/>
</template>

