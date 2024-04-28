<script setup>
import PreviewListItem from './PreviewListItem.vue'
import { makePostOfMonthList } from '../../helpers/helpers.js'

const props = defineProps(['allData', 'year', 'month', 'class'])
const items = makePostOfMonthList(props.allData, Number(props.year), Number(props.month))
</script>

<template>
  <div :class="props.class">
    <ul>
      <li v-for="item in items">
        <PreviewListItem :item="item" />
      </li>
    </ul>
  </div>
</template>

