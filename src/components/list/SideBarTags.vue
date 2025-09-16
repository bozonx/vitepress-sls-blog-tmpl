<template>
  <div class="side-bar-tags">
    <TagsList :tags="tags" sizeSm="true" class="mb-2" />
    <SimpleLink :href="allTagsUrl" class="text-sm">{{
      theme.t.allTagsCall
    }}</SimpleLink>
  </div>
</template>

<script setup>
import { makeTagsList } from '../../list-helpers/listHelpers.js'
import SimpleLink from '../SimpleLink.vue'
import TagsList from '../TagsList.vue'
import { useData } from 'vitepress'

const props = defineProps(['allPosts'])
const { theme, localeIndex } = useData()
const tags = makeTagsList(props.allPosts)
  .map(({ count, ...tag }) => tag)
  .slice(0, theme.value.sidebarTagsCount)
const allTagsUrl = `/${localeIndex.value}/${theme.value.allTagsUrl}`
</script>

<style scoped>
.side-bar-tags {
  padding: 0 1.25rem 00 1.25rem;
}
</style>
