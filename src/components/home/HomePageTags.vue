<script setup>
import TagsList from "../TagsList.vue";
import { makeTagsList } from "../../helpers/listHelpers.js";

const props = defineProps(["allData", "header"]);
const tagList = makeTagsList(props.allData || []);
const sorted = tagList.sort((a, b) => String(a.name).localeCompare(b.name));
</script>

<template>
  <h2 class="font-bold mb-2">{{ props.header }}</h2>
  <TagsList :tags="sorted" :sizeXl="true" class="mb-14" />
</template>
