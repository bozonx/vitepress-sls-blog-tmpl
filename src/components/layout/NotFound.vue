<script setup>
import { useData } from 'vitepress'
import SimpleLink from '../SimpleLink.vue'

const { theme } = useData()
</script>

<template>
<div>
  {{theme.t.notFound}} <SimpleLink>{{theme.t.returnToHome}}</SimpleLink>
</div>
</template>

