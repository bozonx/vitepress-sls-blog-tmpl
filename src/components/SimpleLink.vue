<script setup>
import BaseLink from "./BaseLink.vue";

const props = defineProps(["id", "class", "title", "href", "target"]);
</script>

<template>
  <BaseLink v-bind="props" :class="['simple-link', props.class]">
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

.dark .simple-link {
  color: var(--color-a-dark-link);
}

.dark .simple-link:visited {
  color: var(--color-a-dark-visited);
}

.simple-link:hover {
  filter: brightness(130%);
}
</style>
