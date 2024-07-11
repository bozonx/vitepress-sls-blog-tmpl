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
    'pr-2 pl-3 py-3 font-normal rounded-none btn-lighter',
    props.class,
  ]" iconClass="text-gray-500 dark:text-gray-400" />
</template>
