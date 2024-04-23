
<script setup>
import { Icon } from '@iconify/vue'
import { useData } from 'vitepress'

const { theme } = useData()
</script>

<template>
  <!-- transition:fade={{ delay: 0, duration: 300 }} -->
<span
  class="flex gap-x-2 px-2 py-2 cursor-pointer text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
>
  <Icon icon="fa6-solid:arrow-up" />
  {{theme.returnToTopLabel}}
</span>
</template>

