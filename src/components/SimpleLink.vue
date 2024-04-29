<script setup>
import BaseLink from './BaseLink.vue'

const props = defineProps(['id', 'class', 'href', 'target'])
</script>

<template>
<BaseLink
  v-bind="props"
  :class="['simple-link', props.class]"
><slot /></BaseLink>
</template>

