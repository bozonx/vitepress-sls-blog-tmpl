<script setup>
import { useData } from 'vitepress'
import TagItem from '../TagItem.vue'
import SimpleLink from '../SimpleLink.vue'

const props = defineProps(['class'])
const { theme, frontmatter } = useData()
</script>

<template>
<div v-if="frontmatter.tags?.length" :class="[props.class]">
  <h4 class="mb-3 font-bold text-base text-gray-500">{{theme.t.tags}}:</h4>

  <ul class="flex flex-wrap gap-x-1 gap-y-1">
    <li v-for="tag in frontmatter.tags"><TagItem :text="tag" /></li>
  </ul>

  <div class="mt-4">
    <SimpleLink :href="theme.allTagsUrl">{{theme.t.links.allTagsCall}}</SimpleLink>
  </div>
</div>
</template>

