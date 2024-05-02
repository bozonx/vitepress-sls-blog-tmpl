<script setup>
import BaseLink from './BaseLink.vue'

const props = defineProps(['id', 'class', 'title', 'href', 'target'])
</script>

<template>
<BaseLink
  v-bind="props"
  :class="['simple-link', props.class]"
  :title="props.title"
><slot /></BaseLink>
</template>

