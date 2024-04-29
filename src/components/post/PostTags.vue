<script setup>
import { useData } from 'vitepress'
import TagItem from '../TagItem.vue'

const props = defineProps(['class'])
const { frontmatter } = useData()
const className = `flex flex-wrap gap-x-1 gap-y-1`
</script>

<template>
<ul v-if="frontmatter.tags" :class="[props.class, className]">
  <li v-for="tag in frontmatter.tags"><TagItem :text="tag" /></li>
</ul>
</template>

