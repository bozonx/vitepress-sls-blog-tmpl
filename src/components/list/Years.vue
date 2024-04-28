<script setup>
import { useData } from 'vitepress'
import SimpleLink from '../SimpleLink.vue'
import { makeYearsList } from '../../helpers/helpers.js'

const props = defineProps(['allPosts', 'class'])
const { theme } = useData()
const yearsList = makeYearsList(props.allPosts)
</script>

<template>
<ul v-if="yearsList.length" :class="['', props.class]">
  <li v-for="item in yearsList">
    <SimpleLink
      :href="`/archive/${item.year}`"
      v-if="item.count"
    >{{item.year}} ({{item.count}})</SimpleLink>
  </li>
</ul>
</template>

