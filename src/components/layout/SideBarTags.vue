<template>
  <div class="side-bar-tags">
    <TagsList
      :tags="tags"
      sizeSm="true"
      class="mb-2 side-bar-tags-list"
      activeCompareMethod="softPagination"
    />
    <SimpleLink v-if="showAllTags" :href="allTagsUrl" class="text-sm">{{
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
const allTags = makeTagsList(props.allPosts)
const tags = allTags
  .map(({ count, ...tag }) => tag)
  .slice(0, theme.value.sidebarTagsCount)
const allTagsUrl = `/${localeIndex.value}/${theme.value.tagsBaseUrl}`
const showAllTags = allTags.length > theme.value.sidebarTagsCount
</script>

<style>
.side-bar-tags {
  padding: 0 0.25rem 0 0.75rem;
}

.side-bar-tags-list {
  column-gap: 4px;
  row-gap: 12px;
}

.side-bar-tags .tag-item {
  padding: 3px 9px;
}
</style>
