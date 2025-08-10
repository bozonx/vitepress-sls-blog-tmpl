<script setup>
import { useData } from 'vitepress'

import { makeAuthorsList } from '../../page-helpers/listHelpers.js'
import ListItemWithBadge from './ListItemWithBadge.vue'

const props = defineProps(['allPosts', 'class'])
const { theme } = useData()
const authorsList = makeAuthorsList(props.allPosts, theme.value.authors)
</script>

<template>
  <ul v-if="authorsList.length" :class="props.class">
    <template v-for="item in authorsList">
      <li v-if="item.count">
        <ListItemWithBadge
          :href="`${theme.authorBaseUrl}/${item.id}/1`"
          :text="item.name"
          :count="item.count"
        />
      </li>
    </template>
  </ul>
</template>
