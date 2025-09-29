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
  'onlyDark',
  'hideExternalIcon',
])
const bindProps = computed(() => {
  return { ...props, class: ['rounded-none btn-lighter w-full', props.class] }
})
</script>

<template>
  <Btn v-bind="bindProps" noBg="true">
    <slot>{{ props.text }}</slot>
  </Btn>
</template>
