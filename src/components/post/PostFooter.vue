<script setup>
// import SimilarPostsList from '../list/SimilarPostsList.vue'
import PostAuthor from './PostAuthor.vue'
import PostComments from './PostComments.vue'
import PostDonateLink from './PostDonateLink.vue'
import PostSocialShare from './PostSocialShare.vue'
import PostTags from './PostTags.vue'
</script>

<template>
  <PostAuthor class="mt-10" />
  <PostDonateLink class="mt-10" />
  <PostComments class="mt-20" />
  <PostSocialShare class="mt-10" />
  <PostTags class="mt-10" />
  <!-- <SimilarPostsList class="mt-10" /> -->
</template>
