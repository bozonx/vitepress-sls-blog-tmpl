<script setup>
import { useData } from 'vitepress'
import SimpleLink from '../SimpleLink.vue'
import { makeMonthsList } from '../../helpers/listHelpers.js'

const props = defineProps(['allPosts', 'year', 'class'])
const { theme } = useData()
const monthsList = makeMonthsList(props.allPosts, props.year)
</script>

<template>
<ul v-if="monthsList.length" class="props.class">
  <template v-for="item in monthsList">
    <li v-if="item.count">
      <SimpleLink
        :href="`${theme.archiveBaseUrl}/${props.year}/${item.month}`"
      >{{theme.t.months[item.month - 1]}} ({{item.count}})</SimpleLink>
    </li>
  </template>
</ul>
</template>

