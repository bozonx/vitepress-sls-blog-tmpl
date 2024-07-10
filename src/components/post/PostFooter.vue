<script setup>
import PostTags from "./PostTags.vue";
import PostSocialShare from "./PostSocialShare.vue";
import PostAuthor from "./PostAuthor.vue";
import PostComments from "./PostComments.vue";
import PostDonateLink from "./PostDonateLink.vue";
</script>

<template>
  <PostAuthor class="mt-10" />
  <PostDonateLink class="mt-6" />
  <PostComments class="mt-24" />
  <PostSocialShare class="mt-10" />
  <PostTags class="mt-10" />
</template>
