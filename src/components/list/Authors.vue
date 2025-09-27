<script setup>
import { useData } from 'vitepress'

import { makeAuthorsList } from '../../list-helpers/listHelpers.js'
import ListItemWithBadge from './ListItemWithBadge.vue'

const props = defineProps(['allPosts'])
const { theme } = useData()
const authorsList = makeAuthorsList(props.allPosts, theme.value.authors)
</script>

<template>
  <ul v-if="authorsList.length">
    <template v-for="item in authorsList">
      <li v-if="item.count">
        <ListItemWithBadge
          :href="`${theme.authorsBaseUrl}/${item.id}/1`"
          :text="item.name"
          :count="item.count"
        />
      </li>
    </template>
  </ul>
</template>
