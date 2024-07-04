<script setup>
import { useData } from "vitepress";
import PreviewList from "../list/PreviewList.vue";
import SimpleLink from "../SimpleLink.vue";

const { theme } = useData();
const props = defineProps(["allData", "perPage", "header", "class"]);
const sorted = [...(props.allData || [])].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);
</script>

<template>
  <h2 class="font-bold mb-2">{{ props.header }}</h2>
  <PreviewList :allData="sorted" :curPage="1" :perPage="props.perPage" />

  <div class="mt-6">
    <SimpleLink :href="`${theme.recentBaseUrl}/2`">{{
      theme.t.showMorePosts
      }}</SimpleLink>
  </div>
</template>
