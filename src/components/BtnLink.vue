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
  padding: 0;
  background: transparent !important;
}
</style>
