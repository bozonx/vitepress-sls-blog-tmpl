<script setup>
import TagsList from '../TagsList.vue'
import { makeTagsList } from '../../helpers/listHelpers.js'

const props = defineProps(['allPosts', 'class'])
const tagList = makeTagsList(props.allPosts)
</script>

<template>
<TagsList :tags="tagList" :sizeXl="true" />
</template>

