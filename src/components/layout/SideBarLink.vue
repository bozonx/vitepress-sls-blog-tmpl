<script setup>
import BtnLink from '../BtnLink.vue'

const props = defineProps(['id', 'class', 'text', 'href', 'target', 'icon', 'mobileOnly'])
</script>

<template>
<BtnLink
  v-bind="props"
  :class="['pr-2 pl-3 py-3 font-normal text-gray-700 dark:text-gray-200 sidebar-link', props.class]"
/>
</template>

<style>
.sidebar-link:hover {
  background: #e2e2e2;
}
.sidebar-link.active {
	background: #dadada;
}
.sidebar-link.active:hover {
	background: #cdcdcd;
}
.dark .sidebar-link:hover {
  background: #293546;
}
.dark .sidebar-link.active {
	background: #2f3b4c;
}
.dark .sidebar-link.active:hover {
  background: #334053;
}
</style>

