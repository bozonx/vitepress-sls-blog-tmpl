<script setup>
import { useData } from 'vitepress'
import { makePostOfMonthList } from '../../list-helpers/listHelpers.js'
import PreviewListItem from './PreviewListItem.vue'
import UtilPageHeader from '../UtilPageHeader.vue'

const { frontmatter } = useData()
const props = defineProps(['allPosts', 'year', 'month'])
const items = makePostOfMonthList(props.allPosts, props.year, props.month)
</script>

<template>
  <UtilPageHeader>{{ frontmatter.title }}</UtilPageHeader>
  <ul v-if="items.length">
    <li v-for="item in items">
      <PreviewListItem :item="item" />
    </li>
  </ul>
</template>
