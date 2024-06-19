<script setup>
import TagsList from "../TagsList.vue";
import { makeTagsList } from "../../helpers/listHelpers.js";

const props = defineProps(["allData"]);
const tagList = makeTagsList(props.allData || []);
const sorted = tagList.sort((a, b) => String(a.name).localeCompare(b.name));
</script>

<template>
  <TagsList :tags="sorted" :sizeXl="true" class="mb-14" />
</template>
