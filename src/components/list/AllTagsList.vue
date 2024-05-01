<script setup>
import TagItem from '../TagItem.vue'
import { makeTagsList } from '../../helpers/listHelpers.js'

const props = defineProps(['allPosts', 'class'])
const tagList = makeTagsList(props.allPosts)
</script>

<template>
<ul v-if="tagList.length" :class="['flex flex-wrap gap-x-2 gap-y-6', props.class]">
  <li v-for="item in tagList">
    <TagItem :text="item.name" :count="item.count" :sizeXl="true" />
  </li>
</ul>
</template>

