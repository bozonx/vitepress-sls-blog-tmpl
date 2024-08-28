<script setup>
import PreviewListItem from "./PreviewListItem.vue";
import Pagination from "./Pagination.vue";

const props = defineProps([
  "allData",
  "curPage",
  "perPage",
  "paginationMaxItems",
  "paginationBaseUrl",
]);
const start = props.curPage === 1 ? 0 : (props.curPage - 1) * props.perPage;
const items = props.allData.slice(start, start + props.perPage);
const totalPages = Math.ceil(props.allData.length / props.perPage);
</script>

<template>
  <div>
    <ul>
      <li v-for="item in items">
        <PreviewListItem :item="item" />
      </li>
    </ul>

    <div v-if="props.paginationBaseUrl && totalPages > 1" class="mt-14">
      <Pagination :curPage="props.curPage" :totalPages="totalPages" :maxItems="props.paginationMaxItems"
        :baseUrl="props.paginationBaseUrl" />
    </div>
  </div>
</template>
