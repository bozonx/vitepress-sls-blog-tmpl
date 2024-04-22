<script setup>
  import { defineProps } from 'vue'

  const props = defineProps(['data'])

</script>

<template>
  <a :href="props.data.url">
    <h3>{{ props.data.fromMd.title }}</h3>
    <p>{{ props.data.fromMd.preview }}</p>
  </a>
</template>

