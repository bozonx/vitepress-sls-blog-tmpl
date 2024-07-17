<script setup>
import Btn from "./Btn.vue";

const props = defineProps([
  "id",
  "class",
  "href",
  "title",
  "target",
  "icon",
  "text",
  "disabled",
  "iconClass",
  "hideExternalIcon",
]);
</script>

<template>
  <Btn v-bind="props" :class="['btn-link', props.class]">
    <slot />
  </Btn>
</template>

<style>
.btn-link {
  padding: 0;
  background: transparent !important;
}

.btn-link.active {
  color: var(--btn-link-text-active);
}

.btn-link.active:hover {
  color: black;
}

.dark .btn-link.active {
  color: var(--btn-link-dark-text-active);
}

.dark .btn-link.active:hover {
  color: var(--btn-dark-text-hover);
}
</style>
