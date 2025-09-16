<template>
  <div
    class="author-container flex flex-col md:flex-row gap-x-6 gap-y-1 items-start"
  >
    <!-- Картинка автора -->
    <div class="author-image-container w-full md:w-[280px] md:flex-shrink-0">
      <img
        :src="author?.image"
        :alt="author?.name"
        :sizes="`(min-width: ${PHONE_BREAKPOINT}px) 280px, 100vw`"
        :height="author?.imageHeight"
        :width="author?.imageWidth"
        class="w-full h-auto rounded-lg"
      />
    </div>

    <!-- Контент автора -->
    <div class="author-content flex-1">
      <div class="mb-6 vp-doc" v-html="author?.descr"></div>
      <SocialMediaLinks v-if="author?.links" :links="author.links" />
    </div>
  </div>
</template>

<script setup>
import SocialMediaLinks from './SocialMediaLinks.vue'
import { PHONE_BREAKPOINT } from '../constants.js'

const props = defineProps(['author'])
</script>
