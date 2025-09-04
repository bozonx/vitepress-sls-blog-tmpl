<script setup>
import { makePostOfMonthList } from '../../list-helpers/listHelpers.js'
import PreviewListItem from './PreviewListItem.vue'

const props = defineProps(['allPosts', 'year', 'month'])
const items = makePostOfMonthList(props.allPosts, props.year, props.month)
</script>

<template>
  <ul v-if="items.length">
    <li v-for="item in items">
      <PreviewListItem :item="item" />
    </li>
  </ul>
</template>
