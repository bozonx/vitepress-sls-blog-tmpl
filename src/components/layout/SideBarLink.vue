<script setup>
import { computed } from 'vue'
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
const bindProps = computed(() => {
  return {
    ...props,
    class: [
      'pr-2 pl-3 py-3 font-normal rounded-none btn-lighter w-full sidebar-link',
      props.class,
    ],
  }
})
</script>

<template>
  <Btn
    v-bind="bindProps"
    noBg="true"
    iconClass="muted"
    activeCompareMethod="softPagination"
  />
</template>

<style scoped>
.sidebar-link {
  transition: all 0.2s ease-in-out;
  border: 0 none;
}

.sidebar-link :deep(.flex) {
  transition: transform 0.2s ease-in-out;
}

.sidebar-link:hover :deep(.flex) {
  transform: translateX(4px);
}
</style>
