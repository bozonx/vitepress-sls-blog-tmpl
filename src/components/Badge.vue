<script setup>
const props = defineProps(["count", "title"]);
</script>

<template>
  <span class="rounded-full text-sm badge-item" :title="props.title">
    {{ props.count }}
  </span>
</template>

<style scoped>
.badge-item {
  color: white;
  padding: 0.5rem;
  line-height: 0.5rem !important;
  height: 1.5rem;
  background: var(--badge-bg);
}
</style>
