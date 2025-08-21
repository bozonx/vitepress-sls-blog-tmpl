<script setup>
import Btn from '../Btn.vue'

const props = defineProps([
  'id',
  'class',
  'text',
  'href',
  'target',
  'icon',
  'mobileOnly',
])
const { class: className, ...bindProps } = props
</script>

<template>
  <Btn
    v-bind="bindProps"
    noBg="true"
    :class="['pr-2 pl-3 py-3 font-normal rounded-none btn-lighter', className]"
    iconClass="muted"
  />
</template>
