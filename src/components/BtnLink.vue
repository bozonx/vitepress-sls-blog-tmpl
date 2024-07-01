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
  "iconClass",
]);
</script>

<template>
  <Btn v-bind="props" :class="['btn-link', props.class]" />
</template>

<style>
.btn-link {
  padding: 0;
  background: transparent !important;
}
</style>
