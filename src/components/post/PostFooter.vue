<script setup>
import { inject } from 'vue'
import { useData } from 'vitepress'
import PostSimilarList from './PostSimilarList.vue'
import PostAuthor from './PostAuthor.vue'
import PostComments from './PostComments.vue'
import PostDonateLink from './PostDonateLink.vue'
import PostSocialShare from './PostSocialShare.vue'
import PostTags from './PostTags.vue'
import EditLink from '../EditLink.vue'

const props = defineProps(['localePosts'])
const { localeIndex } = useData()
const allPosts = inject('posts')
const localePosts = props.localePosts || allPosts[localeIndex.value]
</script>

<template>
  <PostAuthor class="mt-10" />

  <div class="flex mt-10">
    <EditLink />
  </div>

  <PostDonateLink class="mt-10" />
  <PostComments class="mt-20" />
  <PostSocialShare class="mt-10" />
  <PostTags class="mt-10" />
  <PostSimilarList class="mt-14" :localePosts="localePosts" />
</template>
