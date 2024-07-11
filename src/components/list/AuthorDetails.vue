<script setup>
import { useData } from "vitepress";
import PreviewList from "./PreviewList.vue";
import UtilPageHeader from "../UtilPageHeader.vue";
import { mdToHtml } from "../../helpers/convertMd.js";

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
const author = theme.value.authors.find((item) => item.id === props.authorId);
const descr = author && author.descr && mdToHtml(author.descr);
</script>

<template>
  <div class="mb-12 vp-doc" v-html="descr"></div>

  <UtilPageHeader>{{ theme.t.links.allPostsOfAuthor }}</UtilPageHeader>

  <PreviewList :allData="sorted" :curPage="curPage" :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems" :paginationBaseUrl="theme.authorBaseUrl" />
</template>
