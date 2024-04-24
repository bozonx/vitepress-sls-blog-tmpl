<script setup>
import { useData } from 'vitepress'

const props = defineProps(['class'])
const { page } = useData()
</script>

<template>
<div :class="props.class">
  social share
</div>
</template>

