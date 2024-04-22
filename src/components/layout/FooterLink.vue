<script setup>
import LayoutLink from './LayoutLink.vue'
const props = defineProps(['text', 'href', 'icon'])
</script>

<template>
<LayoutLink :href="props.href" :icon="props.icon" class="hover:text-gray-400 hover:dark:text-gray-300">{{props.text}}</LayoutLink>
</template>

