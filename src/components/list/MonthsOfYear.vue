<script setup>
import { useData } from 'vitepress'

import { makeMonthsList } from '../../page-helpers/listHelpers.js'
import ListItemWithBadge from './ListItemWithBadge.vue'

const props = defineProps([
  'allPosts',
  'year',
  'curPage',
  'perPage',
  'paginationMaxItems',
])
const { theme } = useData()
const monthsList = makeMonthsList(props.allPosts, props.year)

const curPage = Number(props.curPage)
const sorted = [...(props.allData || [])].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
)
</script>

<template>
  <div>
    <ul v-if="monthsList.length">
      <template v-for="item in monthsList">
        <li v-if="item.count">
          <ListItemWithBadge
            :href="`${theme.archiveBaseUrl}/${props.year}/${item.month}`"
            :text="theme.t.months[item.month - 1]"
            :count="item.count"
          />
        </li>
      </template>
    </ul>

    <PreviewList
      :allData="sorted"
      :curPage="curPage"
      :perPage="props.perPage"
      :paginationMaxItems="props.paginationMaxItems"
      :paginationBaseUrl="theme.recentBaseUrl"
    />
  </div>
</template>
