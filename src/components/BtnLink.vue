<script setup>
import { computed } from 'vue'
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

const bindProps = computed(() => {
  return { ...props, class: ['btn-link', props.class] }
})
</script>

<template>
  <Btn v-bind="bindProps">
    <slot />
  </Btn>
</template>

<style>
.btn-link {
  padding: 0;
  background: transparent !important;
  color: var(--btn-link-text);
}
</style>
