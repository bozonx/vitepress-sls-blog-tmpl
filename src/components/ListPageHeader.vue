<template>
  <div class="flex gap-x-1 items-end mb-5">
    <h2 class="font-bold flex-1">
      <slot />
    </h2>

    <Btn
      :text="theme.t.sortByDate"
      :href="`${props.baseUrl}/1`"
      class="hover-animation-rise"
    />
    <Btn
      :text="theme.t.sortByPopularity"
      :href="`${popularBaseUrl}/1`"
      class="hover-animation-rise"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import Btn from './Btn.vue'

const { theme } = useData()

const props = defineProps(['baseUrl'])

const popularBaseUrl = computed(() => {
  return `${props.baseUrl}/${theme.value.popularBaseUrl}`
})
</script>
