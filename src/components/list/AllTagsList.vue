<script setup>
import { useData } from 'vitepress'
import { makeTagsList } from '../../list-helpers/listHelpers.js'
import TagsList from '../TagsList.vue'
import UtilPageHeader from '../UtilPageHeader.vue'

const { frontmatter } = useData()
const props = defineProps(['allPosts'])
const tagList = makeTagsList(props.allPosts)
</script>

<template>
  <UtilPageHeader>{{ frontmatter.title }}</UtilPageHeader>
  <TagsList :tags="tagList" :sizeXl="true" class="flex-col" />
</template>
