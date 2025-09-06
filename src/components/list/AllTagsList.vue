<script setup>
import { makeTagsList } from '../../list-helpers/listHelpers.js'
import TagsList from '../TagsList.vue'
import { inject } from 'vue'

const props = defineProps(['allPosts'])
const tagList = makeTagsList(props.allPosts)

const posts = inject('posts')
console.log(11111111, posts.value)
</script>

<template>
  <TagsList :tags="tagList" :sizeXl="true" class="flex-col" />
</template>
