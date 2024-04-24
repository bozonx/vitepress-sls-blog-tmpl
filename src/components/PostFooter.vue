<script setup>
import { useData } from 'vitepress'
import PostTags from './PostTags.vue'
import PostSocialShare from './PostSocialShare.vue'
import PostAuthor from './PostAuthor.vue'
import PostComments from './PostComments.vue'
import SimpleLink from './SimpleLink.vue'

const { theme } = useData()
</script>

<template>
<PostAuthor class="mt-10" />

<div v-if="theme.ui.donateCall" class="mt-6">
  {{theme.ui.donateCall}}
</div>

<!-- <PostSocialShare class="mt-10" /> -->

<PostComments class="mt-24" />


<PostTags class="mt-6" />

<div class="mt-6">
  <SimpleLink :href="theme.ui.tagsBaseUrl">{{theme.ui.allTagsCall}}</SimpleLink>
</div>
</template>

