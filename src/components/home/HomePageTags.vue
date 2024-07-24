<script setup>
import TagsList from "../TagsList.vue";
import { makeTagsList } from "../../helpers/listHelpers.js";
import UtilPageHeader from "../UtilPageHeader.vue";

const props = defineProps(["allData", "header"]);
const tagList = makeTagsList(props.allData || []);
const sorted = tagList.sort((a, b) => String(a.name).localeCompare(b.name));
</script>

<template>
  <UtilPageHeader class="home-hero-tags-header">{{
    props.header
    }}</UtilPageHeader>
  <TagsList :tags="sorted" :sizeXl="true" class="mb-14 home-hero-tags" />
</template>

<style>
.home-hero-tags-header {
  text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.8);
}

.home-hero-tags .tag-item {
  box-shadow: 8px 8px 20px 0px rgba(0, 0, 0, 0.3);
}
</style>
