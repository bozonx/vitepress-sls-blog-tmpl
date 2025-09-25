<script setup>
const props = defineProps(['src', 'descr', 'alt', 'height', 'width'])
</script>

<template>
  <figure v-if="props.src">
    <a :href="props.src" class="lightbox">
      <img
        :src="props.src"
        :alt="props.alt || undefined"
        :height="props.height"
        :width="props.width"
      />
    </a>
    <figcaption
      v-if="props.descr"
      v-html="props.descr"
      class="vp-doc"
    ></figcaption>
  </figure>
</template>
