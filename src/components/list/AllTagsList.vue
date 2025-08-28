<script setup>
import { makeTagsList } from '../../list-helpers/listHelpers.js'
import TagsList from '../TagsList.vue'

const props = defineProps(['allPosts'])
const tagList = makeTagsList(props.allPosts)
</script>

<template>
  <TagsList :tags="tagList" :sizeXl="true" class="flex-col" />
</template>
