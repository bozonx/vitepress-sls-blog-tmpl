<script setup>
import { useData } from 'vitepress'
import BaseLink from '../BaseLink.vue'

const { theme } = useData()
const props = defineProps(['maxItems', 'curPage', 'totalPages', 'baseUrl', 'class'])
const items = []

const curPage = props.curPage 
const maxItems = props.maxItems
const totalPages = props.totalPages
/*
const curPage = 3
const maxItems = 7
const totalPages = 6
*/
if (curPage >= 1 && totalPages > 1 && curPage <= totalPages) {
  items.push({
    name: '<<',
    //href: `${props.baseUrl}/${props.curPage - 1}`,
    //active: false,
    href: `${props.baseUrl}/1`,
    disabled: curPage <= 1,
    title: theme.value.t.paginationToStart
  })

  const halfPages = (maxItems - 1) / 2
  let minusPages = halfPages
  let plusPages = halfPages

  if (halfPages !== Math.ceil(halfPages)) {
    minusPages = Math.floor(halfPages)
    plusPages = Math.ceil(halfPages)
  }

  let startPage = curPage - minusPages
  let endPage = curPage + plusPages

  if (startPage < 1) {
    startPage = 1
    endPage = (totalPages < maxItems) ? totalPages : maxItems
  }
  else if (endPage > totalPages) {
    startPage = totalPages - maxItems + 1
    endPage = totalPages
  }

  for (let i = startPage; i <= endPage; i++) {
    items.push({
      name: i,
      href: `${props.baseUrl}/${i}`,
      disabled: false,
    })
  }

  items.push({
    name: '>>',
    //href: `${props.baseUrl}/${props.curPage + 1}`,
    href: `${props.baseUrl}/${totalPages}`,
    disabled: curPage === totalPages,
    title: theme.value.t.paginationToEnd
  })
}
</script>

<template>
<ul v-if="items.length" class="flex gap-x-1">
  <li v-for="item of items">
    <BaseLink
      :href="(item.disabled) ? null : item.href"
      :disabled="item.disabled"
      :title="item.title"
      :class="['pagination-item', item.disabled && 'disabled']"
    >{{item.name}}</BaseLink>
  </li>
</ul>
</template>

<style>
.pagination-item {
  border-radius: 0.5rem;
	padding: 0.5rem 0.8rem;
}
.pagination-item:hover {
  background: var(--bg-btn-hover);
}
.pagination-item.active {
  background: var(--bg-btn-active);
}
.pagination-item.active:hover {
  background: var(--bg-btn-active-hover);
}
.pagination-item.disabled {
  background: none !important;
  cursor: default;
  color: var(--text-a-disabled);
}

.dark .pagination-item:hover {
  background: var(--dark-bg-btn-hover);
}
.dark .pagination-item.active {
  background: var(--dark-bg-btn-active);
}
.dark .pagination-item.active:hover {
  background: var(--dark-bg-btn-active-hover);
}
.dark .pagination-item.disabled {
  color: var(--dark-text-a-disabled);
}
</style>
