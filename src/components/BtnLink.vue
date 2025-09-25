<script setup>
import Btn from './Btn.vue'

const props = defineProps([
  'id',
  'class',
  'href',
  'title',
  'target',
  'icon',
  'text',
  'disabled',
  'iconClass',
  'hideExternalIcon',
])

const { class: className, ...bindProps } = props
</script>

<template>
  <Btn v-bind="bindProps" :class="['btn-link', className]">
    <slot />
  </Btn>
</template>

<style>
.btn-link {
  padding: 0;
  background: transparent !important;
  color: var(--gray-700);
}

.btn-link.active {
  color: var(--btn-link-text-active);
}

.btn-link.active:hover {
  color: black;
}

.dark .btn-link {
  color: var(--gray-300);
}

.dark .btn-link.active {
  color: var(--btn-link-dark-text-active);
}

.dark .btn-link.active:hover {
  color: var(--btn-dark-text-hover);
}
</style>
