<template>
  <div class="flex flex-col md:flex-row gap-x-1 items-baseline gap-y-4 mb-7">
    <h1 class="font-bold flex-1 m-0!">
      <slot />
    </h1>

    <div class="flex items-center gap-1">
      <Btn
        :text="theme.t.links.recent"
        :href="`${props.baseUrl}/1`"
        :icon="theme.recentIcon"
        class="hover-animation-rise"
        activeCompareMethod="pagination"
      />
      <Btn
        :text="theme.t.links.popular"
        :href="`${popularBaseUrl}/1`"
        :icon="theme.popularIcon"
        class="hover-animation-rise"
        activeCompareMethod="pagination"
      />
    </div>
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
