<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template v-if="frontmatter.title">
  <h1 class="text-4xl max-md:text-2xl mb-5 tracking-tight">{{frontmatter.title}}</h1>
</template>

