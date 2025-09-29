<script setup>
import { computed } from 'vue'
import BaseLink from './BaseLink.vue'

const props = defineProps(['id', 'class', 'title', 'href', 'target', 'rel'])
const bindProps = computed(() => {
  return { ...props, class: ['simple-link', props.class] }
})
</script>

<template>
  <BaseLink v-bind="bindProps">
    <slot />
  </BaseLink>
</template>

<style>
.simple-link {
  text-decoration: underline;
  color: var(--color-a-light-link);
}

.simple-link:visited {
  color: var(--color-a-light-visited);
}

.simple-link:hover {
  filter: brightness(130%);
}
</style>
