<script setup>
import { useData } from "vitepress";
import Btn from "../Btn.vue";

const { theme } = useData();
const props = defineProps([
  "maxItems",
  "curPage",
  "totalPages",
  "baseUrl",
  "class",
]);
const items = [];

const curPage = props.curPage;
const maxItems = props.maxItems;
const totalPages = props.totalPages;

// const curPage = 5;
// const maxItems = 7;
// const totalPages = 9;

if (curPage >= 1 && totalPages > 1 && curPage <= totalPages) {
  const halfPages = (maxItems - 1) / 2;
  let minusPages = halfPages;
  let plusPages = halfPages;

  if (halfPages !== Math.ceil(halfPages)) {
    minusPages = Math.floor(halfPages);
    plusPages = Math.ceil(halfPages);
  }

  let startPage = curPage - minusPages;
  let endPage = curPage + plusPages;

  if (startPage < 1) {
    startPage = 1;
    endPage = totalPages < maxItems ? totalPages : maxItems;
  } else if (endPage > totalPages) {
    startPage = totalPages - maxItems + 1;
    endPage = totalPages;
  }

  if (startPage !== 1) {
    items.push({
      name: "<<",
      href: `${props.baseUrl}/1`,
      title: theme.value.t.paginationToStart,
    });
  }

  for (let i = startPage; i <= endPage; i++) {
    items.push({
      name: i,
      href: `${props.baseUrl}/${i}`,
    });
  }

  if (totalPages - endPage > 0) {
    items.push({
      name: ">>",
      href: `${props.baseUrl}/${totalPages}`,
      title: theme.value.t.paginationToEnd,
    });
  }
}
</script>

<template>
  <ul v-if="items.length" class="flex gap-x-1">
    <li v-for="item of items">
      <Btn :href="item.href" :title="item.title" :text="item.name" class="px-3" />
    </li>
  </ul>
</template>
