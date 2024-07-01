<script setup>
import Btn from "../Btn.vue";

const props = defineProps([
  "id",
  "class",
  "text",
  "href",
  "target",
  "icon",
  "mobileOnly",
]);
</script>

<template>
  <Btn v-bind="props" :class="[
    'pr-2 pl-3 py-3 font-normal rounded-none sidebar-link',
    props.class,
  ]" iconClass="text-gray-500 dark:text-gray-400" />
</template>

<style>
.sidebar-link:hover {
  background: var(--sidebar-link-bg-hover);
}

.sidebar-link.active {
  background: var(--sidebar-link-bg-active);
}

.sidebar-link.active:hover {
  background: var(--sidebar-link-bg-active-hover);
}

.dark .sidebar-link:hover {
  background: var(--sidebar-link-dark-bg-hover);
}

.dark .sidebar-link.active {
  background: var(--sidebar-link-dark-bg-active);
}

.dark .sidebar-link.active:hover {
  background: var(--sidebar-link-dark-bg-active-hover);
}
</style>
