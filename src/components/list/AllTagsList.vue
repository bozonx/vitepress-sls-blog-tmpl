<script setup>
import TagItem from '../TagItem.vue'
import { makeTagsList } from '../../helpers/helpers.js'

const props = defineProps(['allPosts', 'class'])
const tagList = makeTagsList(props.allPosts)
</script>

<template>
  <ul v-if="tagList.length" :class="['sm:grid grid-cols-4 gap-2 max-sm:space-x-1 max-sm:space-y-2 ', props.class]">
    <li v-for="item in tagList">
      <TagItem :text="item.name" :count="item.count" />
    </li>
  </ul>
</template>

