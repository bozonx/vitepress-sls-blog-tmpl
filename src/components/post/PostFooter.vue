<script setup>
import { useData } from 'vitepress'
import PostTags from './PostTags.vue'
import PostSocialShare from './PostSocialShare.vue'
import PostAuthor from './PostAuthor.vue'
import PostComments from './PostComments.vue'
import SimpleLink from '../SimpleLink.vue'

const { theme, frontmatter } = useData()
</script>

<template>
<PostAuthor class="mt-10" />

<div v-if="theme.ui.donateLink" class="mt-6">
  <span class="mr-2">{{theme.t.donateCall}}</span>
  <SimpleLink :href="theme.ui.donateLink">{{theme.t.links.donate}}</SimpleLink>
</div>

<PostComments class="mt-24" />
<PostSocialShare class="mt-10" />
<PostTags class="mt-10" />
</template>

