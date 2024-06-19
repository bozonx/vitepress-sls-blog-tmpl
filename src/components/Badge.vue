<script setup>
const props = defineProps(["count"]);
const className = "rounded-full text-sm text-white bg-blue-500 badge-item";
</script>

<template>
  <span :class="className">{{ props.count }}</span>
</template>

<style>
.badge-item {
  padding: 0.5rem;
  line-height: 0.5rem !important;
  height: 1.5rem;
}
</style>
