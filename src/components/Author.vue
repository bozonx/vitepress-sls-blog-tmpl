<template>
  <div>
    <div class="">
      <img :src="author?.image" :alt="author?.name" />
    </div>

    <h2>{{ author?.name }}</h2>

    <div class="mb-12 vp-doc" v-html="author?.descr"></div>
    <SocialMediaLinks v-if="author?.links" :links="author.links" />
  </div>
</template>

<script setup>
import SocialMediaLinks from './SocialMediaLinks.vue'

const props = defineProps(['author'])
</script>
