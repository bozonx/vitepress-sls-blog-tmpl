<script setup>
import { Icon } from '@iconify/vue'
const props = defineProps(['text', 'href', 'icon', 'class'])
</script>

<template>
<h4 class="text-sm pl-2 mt-6 mb-1 text-gray-500 dark:text-gray-400">
  <span v-if="props.icon"><Icon :icon="props.icon" class="text-gray-500 dark:text-gray-400"/></span>
  <span>{{props.text}}</span>
</h4>
</template>

