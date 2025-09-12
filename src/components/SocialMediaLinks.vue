<template>
  <div>
    <ul>
      <li v-for="link in links" :key="link.url">
        <a :href="link.url" :title="link.title">{{ link.title }}</a>
        <Icon :icon="link.type" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps(['links'])
</script>

<style scoped></style>
