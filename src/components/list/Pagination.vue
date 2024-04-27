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
<ul>
  <li v-for="item of items">
    <a
      :href="(item.disabled) ? null : item.href"
      :disabled="item.disabled"
      :color="item.active ? 'blue' : 'light'"
      :class="item.disabled && 'bg-gray-200'"
    >{{item.name}}</a>
  </li>
</ul>
</template>

