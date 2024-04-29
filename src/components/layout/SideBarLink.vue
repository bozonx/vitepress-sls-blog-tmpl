<script setup>
import BtnLink from '../BtnLink.vue'

const props = defineProps(['id', 'class', 'text', 'href', 'target', 'icon', 'mobileOnly'])
</script>

<template>
<BtnLink
  v-bind="props"
  :class="['p-2 pl-3 font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700', props.class]"
/>
</template>
 
