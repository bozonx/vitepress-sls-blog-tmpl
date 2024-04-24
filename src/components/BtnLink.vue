<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps(['class', 'href', 'target', 'icon'])

</script>

<template>
<a
  :class="['flex items-center underline hover:text-gray-700 dark:hover:text-white', props.class]"
  :href="props.href"
  :target="target"
>
  <span v-if="props.icon" class="mr-2"><Icon :icon="props.icon" /></span>
  <span><slot /></span>
</a>
</template>

