<template>
  <div class="flex gap-x-1 items-end mb-5">
    <h2 class="font-bold flex-1">
      <slot />
    </h2>
    <Btn
      :text="theme.t.sortByPopularity"
      :href="`${popularBaseUrl}/1`"
      :disabled="isPopularActive"
      class="hover-animation-rise"
    />
    <Btn
      :text="theme.t.sortByDate"
      :href="`${recentBaseUrl}/1`"
      :disabled="!isPopularActive"
      class="hover-animation-rise"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import Btn from './Btn.vue'

const route = useRoute()
const { theme } = useData()

const props = defineProps(['baseUrl'])

const popularBaseUrl = computed(() => {
  return `${props.baseUrl}/${theme.value.popularBaseUrl}`
})

const recentBaseUrl = computed(() => {
  return props.baseUrl
})
const isPopularActive = computed(() => {
  return route.path.includes(popularBaseUrl.value)
})
</script>
