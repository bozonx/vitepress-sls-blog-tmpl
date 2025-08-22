<script setup>
import { useData } from 'vitepress'

import { arraysIntersection } from '../../helpers/helpers.js'
import PreviewList from './PreviewList.vue'

const props = defineProps(['allPosts'])
const { frontmatter, theme } = useData()
let items = []

if (frontmatter.value.tags) {
  items = [...(props.allPosts || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter(
      (item) => arraysIntersection(item.tags, frontmatter.value.tags).length
    )
  // TODO: отсортировать так чтобы если больше вхождений тэгов то сверху
  // .slice(0, theme.value.similarPostsCount)
  // .map((item) => ({ href: item.url, text: item.title }))

  console.log(items, props.allPosts)
}
</script>

<template>
  similar

  <PreviewList :allPosts="items" />

  <!-- <ul v-if="items.length">
    <li v-for="item in items">
      <ListItemWithBadge :item="item" />
    </li>
  </ul> -->
</template>
