<script setup>
import PreviewListItem from './PreviewListItem.vue'
import { makePostOfMonthList } from '../../helpers/listHelpers.js'

const props = defineProps(['allData', 'year', 'month', 'class'])
const items = makePostOfMonthList(props.allData, props.year, props.month)
</script>

<template>
<ul v-if="items.length" :class="props.class">
  <li v-for="item in items">
    <PreviewListItem :item="item" />
  </li>
</ul>
</template>

