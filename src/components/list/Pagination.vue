<script setup>

const props = defineProps(['maxItems', 'curPage', 'totalPages', 'baseUrl', 'class'])
const items = []

items.push({
  name: '<',
  href: `${props.baseUrl}/${props.curPage - 1}`,
  active: false,
  disabled: props.curPage <= 1
})

// TODO: расчитать чтобы текущая была посередине и показать максимум

for (let i = 1; i <= props.totalPages; i++) {
  items.push({
    name: i,
    href: `${props.baseUrl}/${i}`,
    active: i === props.curPage,
    disabled: false
  })
}

items.push({
  name: '>',
  href: `${props.baseUrl}/${props.curPage + 1}`,
  active: false,
  disabled: props.curPage === props.totalPages || props.totalPages <= 1
})
</script>

<template>
<ul class="flex">
  <li v-for="item of items">
    <a
      :href="(item.disabled) ? null : item.href"
      :disabled="item.disabled"
      :class="['p-3', item.active ? 'text-blue-500 dark:text-blue-400' : '', item.disabled && 'cursor-default text-gray-400 dark:text-gray-600']"
    >{{item.name}}</a>
  </li>
</ul>
</template>

