<script setup>
import { useData } from "vitepress";
import PreviewList from "../list/PreviewList.vue";
import SimpleLink from "../SimpleLink.vue";
import UtilPageHeader from "../UtilPageHeader.vue";

const { theme } = useData();
const props = defineProps(["allData", "perPage", "header", "class"]);
const sorted = [...(props.allData || [])].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);
</script>

<template>
  <UtilPageHeader>{{ props.header }}</UtilPageHeader>
  <PreviewList :allData="sorted" :curPage="1" :perPage="props.perPage" />

  <div class="mt-6">
    <SimpleLink :href="`${theme.recentBaseUrl}/2`">{{
      theme.t.showMorePosts
      }}</SimpleLink>
  </div>
</template>
