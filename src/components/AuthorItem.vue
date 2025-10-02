<template>
  <li v-if="item.count">
    <ListItemWithBadge
      :href="`${theme.authorsBaseUrl}/${props.item.id}/1`"
      :text="props.item.name"
      :count="item.count"
    />
  </li>
</template>

<script setup>
import { useData } from 'vitepress'
import ListItemWithBadge from './ListItemWithBadge.vue'

const props = defineProps(['item'])
const { theme } = useData()
</script>
