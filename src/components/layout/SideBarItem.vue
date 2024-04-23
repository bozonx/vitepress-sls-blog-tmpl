<script setup>
import LayoutLink from './LayoutLink.vue'

const props = defineProps(['text', 'href', 'icon', 'mobile', 'class'])
</script>

<template>
<LayoutLink
  v-bind="props"
  class="p-2 pl-3 font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-none"
>{{props.text}}</LayoutLink>
</template>
 
