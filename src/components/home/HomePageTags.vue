<script setup>
import { makeTagsList } from '../../list-helpers/listHelpers.js'
import TagsList from '../TagsList.vue'
import UtilSubPageHeader from '../UtilSubPageHeader.vue'

const props = defineProps(['allPosts', 'header'])
const tagList = makeTagsList(props.allPosts || [])
// const sorted = tagList.sort((a, b) => String(a.name).localeCompare(b.name))
</script>

<template>
  <UtilSubPageHeader class="home-hero-tags-header">{{
    props.header
  }}</UtilSubPageHeader>
  <TagsList :tags="tagList" class="mb-12 home-hero-tags" />
</template>

<style>
.home-hero-tags-header {
  text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.8);
}

.home-hero-tags .tag-item {
  box-shadow: 8px 8px 20px 0px rgba(0, 0, 0, 0.3);
}
</style>
