<script setup>
import { useData } from 'vitepress'

const { theme } = useData()
</script>

<template>
  <div
    v-if="theme.postDonateCall"
    v-html="theme.postDonateCall"
    class="vp-doc"
  ></div>
</template>
