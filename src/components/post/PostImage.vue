<script setup>
const props = defineProps(["src", "descr", "alt"]);

// const VIRTUAL_WIDTH = 776;
const VIRTUAL_HEIGHT = 437;
</script>

<template>
  <figure v-if="props.src">
    <img :src="props.src" :alt="props.alt || undefined" :height="VIRTUAL_HEIGHT" />
    <figcaption v-if="props.descr" v-html="props.descr" class="vp-doc"></figcaption>
  </figure>
</template>
