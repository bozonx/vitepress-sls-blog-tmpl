<script setup>
import { useData, useRoute } from 'vitepress'
import Btn from '../Btn.vue'

const route = useRoute()
const { theme } = useData()
const props = defineProps([
  'paginationMaxItems',
  'curPage',
  'totalPages',
  'paginationBaseUrl',
])
const items = []

const curPage = props.curPage
const maxItems = props.paginationMaxItems || theme.value.paginationMaxItems
const totalPages = props.totalPages
const baseUrl =
  props.paginationBaseUrl || route.path.split('/').slice(0, -1).join('/')

// const curPage = 4;
// const maxItems = 7;
// const totalPages = 4;

if (curPage >= 1 && totalPages > 1 && curPage <= totalPages) {
  const halfPages = (maxItems - 1) / 2
  let minusPages = halfPages
  let plusPages = halfPages

  if (halfPages !== Math.ceil(halfPages)) {
    minusPages = Math.floor(halfPages)
    plusPages = Math.ceil(halfPages)
  }

  let startPage = curPage - minusPages
  let endPage = curPage + plusPages

  if (startPage <= 1) {
    startPage = 1
    endPage = totalPages < maxItems ? totalPages : maxItems
  } else if (endPage > totalPages) {
    startPage = totalPages - maxItems + 1
    endPage = totalPages
  }

  if (startPage !== 1) {
    items.push({
      name: '<<',
      href: `${baseUrl}/1`,
      title: theme.value.t.paginationToStart,
    })
  }

  for (let i = startPage; i <= endPage; i++) {
    items.push({ name: i, href: `${baseUrl}/${i}` })
  }

  if (totalPages - endPage > 0) {
    items.push({
      name: '>>',
      href: `${baseUrl}/${totalPages}`,
      title: theme.value.t.paginationToEnd,
    })
  }
}
</script>

<template>
  <ul v-if="items.length" class="flex justify-center gap-x-1">
    <li v-for="item of items" class="flex align-center">
      <Btn
        :href="item.href"
        :title="item.title"
        :text="item.name"
        class="px-3 pagination-btn hover-animation-rise"
      />
    </li>
  </ul>
</template>

<style scoped>
.pagination-btn.active {
  text-decoration: underline;
}
</style>
