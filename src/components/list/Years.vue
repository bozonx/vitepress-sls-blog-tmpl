<script setup>
import { useData } from 'vitepress'

import { makeYearsList } from '../../page-helpers/listHelpers.js'
import ListItemWithBadge from './ListItemWithBadge.vue'

const props = defineProps(['allPosts'])
const { theme } = useData()
const yearsList = makeYearsList(props.allPosts)
</script>

<template>
  <ul v-if="yearsList.length">
    <template v-for="item in yearsList">
      <li v-if="item.count">
        <ListItemWithBadge
          :href="`${theme.archiveBaseUrl}/${item.year}`"
          :text="item.year"
          :count="item.count"
        />
      </li>
    </template>
  </ul>
</template>
