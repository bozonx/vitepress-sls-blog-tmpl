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
    :class="[
      'pr-2 pl-3 py-3 font-normal rounded-none btn-lighter w-full sidebar-link',
      className,
    ]"
    iconClass="muted"
  />
</template>

<style scoped>
.sidebar-link {
  transition: all 0.2s ease-in-out;
}

.sidebar-link :deep(.flex) {
  transition: transform 0.2s ease-in-out;
}

.sidebar-link:hover :deep(.flex) {
  transform: translateX(4px);
}
</style>
