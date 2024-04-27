<script setup>
//import { defineProps } from 'vue'

const props = defineProps(['item'])
</script>

<template>
  <a :href="props.item.url">
    <h3>{{ props.item.title }}</h3>
    <p>{{ props.item.preview }}</p>
  </a>
</template>

