<template>
  <div class="flex gap-x-1 items-end mb-5">
    <h1 class="font-bold flex-1 m-0!">
      <slot />
    </h1>

    <Btn
      :text="theme.t.sortByDate"
      :href="`${props.baseUrl}/1`"
      class="hover-animation-rise"
      activeCompareMethod="pagination"
    />
    <Btn
      :text="theme.t.sortByPopularity"
      :href="`${popularBaseUrl}/1`"
      class="hover-animation-rise"
      activeCompareMethod="pagination"
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
