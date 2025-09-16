<template>
  <TagsList :tags="tags" sizeSm />
</template>

<script setup>
import { makeTagsList } from '../../list-helpers/listHelpers.js'
import TagsList from '../TagsList.vue'
import { useData } from 'vitepress'

const props = defineProps(['allPosts'])
const { theme } = useData()
const tags = makeTagsList(props.allPosts)
  .map(({ count, ...tag }) => tag)
  .slice(0, theme.value.sidebarTagsCount)
</script>
