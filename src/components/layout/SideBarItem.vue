<script setup>
import LayoutLink from './LayoutLink.vue'

const props = defineProps(['text', 'href', 'icon', 'class'])
</script>

<template>
<LayoutLink :href="props.href" :icon="props.icon" :class="props.class">{{props.text}}</LayoutLink>
</template>
 
