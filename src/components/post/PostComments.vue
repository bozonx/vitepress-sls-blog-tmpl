<script setup>
import { useData } from 'vitepress'
import { Icon } from '@iconify/vue'
import BtnLink from '../BtnLink.vue'

const props = defineProps(['class'])
const { theme, frontmatter } = useData()
</script>

<template>
<div v-if="frontmatter.commentUrl" :class="props.class">
  <BtnLink :href="frontmatter.commentUrl" target="_blank" icon="fa6-solid:comment-dots">
    {{theme.t.links.commentCall}}
  </BtnLink>
</div>
</template>

