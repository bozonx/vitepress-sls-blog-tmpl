
<script setup>
import {ref} from 'vue'
import LayoutLink from './LayoutLink.vue'

const props = defineProps(['id', 'text', 'href', 'icon'])
</script>

<template>
<LayoutLink :id="props.id" :text="props.text" :href="props.href" :icon="props.icon">{{props.text}}</LayoutLink>
</template>

