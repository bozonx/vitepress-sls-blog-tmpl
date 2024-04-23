<script setup>
import LayoutLink from './LayoutLink.vue'
const props = defineProps(['text', 'href', 'icon', 'mobile'])
</script>

<template>
<LayoutLink v-bind="props" class="hover:text-gray-400 hover:dark:text-gray-300">{{props.text}}</LayoutLink>
</template>

