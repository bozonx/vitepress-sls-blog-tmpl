<script setup>
import Btn from './Btn.vue'

const props = defineProps(['class'])
</script>

<template>
  <Btn v-bind="$attrs" :class="['btn-link', props.class]">
    <slot />
  </Btn>
</template>

<style>
.btn-link {
  display: inline-flex;
  padding: 0;
  background: transparent !important;
  box-shadow: none !important;
}
.btn-link.active {
  border: 0 none;
}

.btn-link.active .btn-base-inner {
  text-decoration: underline;
}
</style>
