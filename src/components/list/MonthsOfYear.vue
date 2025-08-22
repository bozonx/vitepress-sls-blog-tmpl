<script setup>
import { useData } from 'vitepress'

import { makeMonthsList } from '../../page-helpers/listHelpers.js'
import ListItemWithBadge from './ListItemWithBadge.vue'
import PreviewList from './PreviewList.vue'

const props = defineProps([
  'allPosts',
  'year',
  'curPage',
  'perPage',
  'paginationMaxItems',
])
const { theme } = useData()
const monthsList = makeMonthsList(props.allPosts, props.year)

const curPage = Number(props.curPage || 1)
// Фильтруем посты по году
const filtered = props.allPosts.filter((item) => {
  const postYear = new Date(item.date).getUTCFullYear()
  return postYear === Number(props.year)
})
const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
</script>

<template>
  <div>
    <ul v-if="monthsList.length">
      <template v-for="item in monthsList">
        <li v-if="item.count">
          <ListItemWithBadge
            :href="`${theme.archiveBaseUrl}/${props.year}/month/${item.month}`"
            :text="theme.t.months[item.month - 1]"
            :count="item.count"
          />
        </li>
      </template>
    </ul>

    <h2 class="text-2xl font-bold mb-6 mt-6">{{ theme.t.allPostsOfYear }}</h2>

    <PreviewList
      :allData="sorted"
      :curPage="curPage"
      :perPage="props.perPage"
      :paginationMaxItems="props.paginationMaxItems"
      :paginationBaseUrl="`${theme.archiveBaseUrl}/${props.year}`"
    />
  </div>
</template>
