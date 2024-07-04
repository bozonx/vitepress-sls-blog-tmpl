<script setup>
import { useData } from "vitepress";
import PreviewList from "./PreviewList.vue";

const { theme } = useData();
const props = defineProps([
  "allPosts",
  "curPage",
  "perPage",
  "paginationMaxItems",
  "authorId",
  "class",
]);
const curPage = Number(props.curPage);
const items = props.allPosts.filter((post) => post.authorId === props.authorId);
const sorted = [...(items || [])].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);
</script>

<template>
  <h2 class="font-bold mb-2">{{ theme.t.links.allPostsOfAuthor }}</h2>
  <PreviewList :allData="sorted" :curPage="curPage" :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems" :paginationBaseUrl="theme.authorBaseUrl" />
</template>
