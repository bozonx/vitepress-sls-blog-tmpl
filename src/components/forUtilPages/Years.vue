<script setup>
import { useData } from 'vitepress'

import { makeYearsList } from '../../list-helpers/listHelpers.js'
import ListItemWithBadge from '../ListItemWithBadge.vue'
import UtilPageHeader from '../UtilPageHeader.vue'

const props = defineProps(['allPosts'])
const { theme, frontmatter } = useData()
const yearsList = makeYearsList(props.allPosts)
</script>

<template>
  <UtilPageHeader>{{ frontmatter.title }}</UtilPageHeader>
  <ul v-if="yearsList.length">
    <template v-for="item in yearsList">
      <li v-if="item.count">
        <ListItemWithBadge
          :href="`${theme.archiveBaseUrl}/${item.year}/1`"
          :text="item.year"
          :count="item.count"
        />
      </li>
    </template>
  </ul>
</template>
