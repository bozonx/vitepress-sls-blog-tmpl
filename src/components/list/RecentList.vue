<script setup>
import { useData } from "vitepress";
import PreviewList from "./PreviewList.vue";
import { makePostOfMonthList } from "../../helpers/listHelpers.js";

const { theme } = useData();
const props = defineProps([
  "allData",
  "curPage",
  "perPage",
  "paginationMaxItems",
  "class",
]);
const curPage = Number(props.curPage);
const sorted = props.allData.sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);

console.log(1111, props.allData);
</script>

<template>
  <PreviewList :allData="sorted" :curPage="curPage" :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems" :paginationBaseUrl="`${theme.recentBaseUrl}`" />
</template>
