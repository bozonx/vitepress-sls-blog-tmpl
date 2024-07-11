<script setup>
const props = defineProps(["count", "title"]);
const className = "rounded-full text-sm text-white badge-item";
</script>

<template>
  <span :class="className" :title="props.title">{{ props.count }}</span>
</template>

<style>
.badge-item {
  padding: 0.5rem;
  line-height: 0.5rem !important;
  height: 1.5rem;
  background: var(--badge-bg);
}
</style>
