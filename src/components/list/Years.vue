<script setup>
import { useData } from 'vitepress'

import { makeYearsList } from '../../page-helpers/listHelpers.js'
import ListItemWithBadge from './ListItemWithBadge.vue'

const props = defineProps(['allPosts', 'class'])
const { theme } = useData()
const yearsList = makeYearsList(props.allPosts)
</script>

<template>
  <ul v-if="yearsList.length" class="props.class">
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
