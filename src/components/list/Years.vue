<script setup>
import { useData } from 'vitepress'
import SimpleLink from '../SimpleLink.vue'
import { makeYearsList } from '../../helpers/listHelpers.js'

const props = defineProps(['allPosts', 'class'])
const { theme } = useData()
const yearsList = makeYearsList(props.allPosts)
</script>

<template>
<ul v-if="yearsList.length" class="props.class">
  <template v-for="item in yearsList">
    <li v-if="item.count">
      <SimpleLink
        :href="`${theme.archiveBaseUrl}/${item.year}`"
      >{{item.year}} ({{item.count}})</SimpleLink>
    </li>
  </template>
</ul>
</template>

