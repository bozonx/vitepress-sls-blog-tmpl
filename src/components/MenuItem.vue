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
  'activeCompareMethod',
])
const bindProps = computed(() => {
  return {
    ...props,
    class: [
      'pr-2 pl-3 py-3 font-normal  rounded-none menu-item w-full',
      props.class,
    ],
  }
})
</script>

<template>
  <Btn v-bind="bindProps" noBg="true">
    <slot>{{ props.text }}</slot>
  </Btn>
</template>

<style scoped>
/**** Lighter Btn for use on lighter background */
.menu-item {
  border: 0 none;
}

.menu-item:hover,
.menu-item.btn--nobg:hover {
  background: var(--btn-bg);
  filter: brightness(99%);
}

.menu-item.active,
.menu-item.btn--nobg.active {
  background: var(--btn-bg-active);
}

.menu-item.active:hover {
  filter: brightness(103%);
}

.dark .menu-item:hover {
  filter: brightness(125%);
}

.dark .menu-item.active:hover {
  filter: brightness(110%);
}

.menu-item {
  transition: all 0.2s ease-in-out;
}

.menu-item :deep(.flex) {
  transition: transform 0.2s ease-in-out;
}

.menu-item:hover :deep(.flex) {
  transform: translateX(4px);
}
</style>
