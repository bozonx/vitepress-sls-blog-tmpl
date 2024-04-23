<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps(['id', 'class', 'text', 'href', 'icon'])
const isExternal = props.href && !props.href.startsWith('/')
const target = (isExternal) ? '_blank' : undefined
//let active = ref(true)

//$: active = $page.url.pathname === href
  //:class="[(active) ? 'text-gray-500 dark:text-gray-400' : '', (isIcon) ? 'px-3 py-3' : 'px-5 py-2', 'flex items-center gap-x-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800']"
</script>

<template>
<a @click.prevent.stop="$emit('clicked')" :target="target" :href="props.href" :class="['flex', props.class]">
  <span class="flex items-center">
    <span v-if="props.icon" :class="{'layout-link__icon': props.text}">
      <Icon :icon="props.icon" class="text-gray-500 dark:text-gray-400"/>
    </span>
    <span><slot /></span>
  </span>
  <span v-if="isExternal && text" class="layout-link__external-wrapper">
    <span class="layout-link__external-inner">
      <Icon icon="fa6-solid:arrow-up-right-from-square" class="text-gray-500" />
    </span>
  </span>
</a>
</template>

<style>
.layout-link__external-wrapper {
  position: relative;
}
.layout-link__external-inner {
  position: absolute;
  bottom: 0px;
  right: -8px;
  font-size: 11px;
}
.layout-link__icon {
  padding-right: 7px;
}
</style>
