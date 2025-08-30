<script setup>
const props = defineProps(['src', 'descr', 'alt'])
</script>

<template>
  <figure v-if="props.src">
    <img :src="props.src" :alt="props.alt || undefined" />
    <figcaption
      v-if="props.descr"
      v-html="props.descr"
      class="vp-doc"
    ></figcaption>
  </figure>
</template>
