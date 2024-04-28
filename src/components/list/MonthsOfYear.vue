<script setup>
import { useData } from 'vitepress'
import SimpleLink from '../SimpleLink.vue'
import { makeMonthsList } from '../../helpers/helpers.js'

const props = defineProps(['allPosts', 'year', 'class'])
const { theme } = useData()
const monthsList = makeMonthsList(props.allPosts, props.year)
</script>

<template>
<ul v-if="monthsList.length" :class="['', props.class]">
  <li v-for="item in monthsList">
    <SimpleLink
      :href="`/archive/${props.year}/${item.month}`"
      v-if="item.count"
    >{{theme.t.months[item.month - 1]}} ({{item.count}})</SimpleLink>
  </li>
</ul>
</template>

