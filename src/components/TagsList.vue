
<script setup>
import TagItem from './TagItem.vue'
import { makeTagsList } from '../helpers/listHelpers.js'

const props = defineProps(['tags', 'sizeXl', 'sizeSm', 'class'])
</script>

<template>
<ul v-if="props.tags.length" :class="['flex flex-wrap gap-x-2 gap-y-6', props.class]">
  <li v-for="item in props.tags">
    <TagItem
      :text="item.name"
      :count="item.count"
      :sizeXl="props.sizeXl"
      :sizeSm="props.sizeSm"
    />
  </li>
</ul>
</template>

