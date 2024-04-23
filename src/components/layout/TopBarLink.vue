
<script setup>
import {ref} from 'vue'
import LayoutLink from './LayoutLink.vue'

const props = defineProps(['id', 'text', 'href', 'icon', 'mobile', 'class'])
</script>

<template>
<LayoutLink
  v-bind="props"
  :class="[(props.text ? 'px-5 py-2' : 'px-3 py-3'), ' rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800']"
>{{props.text}}</LayoutLink>
</template>

