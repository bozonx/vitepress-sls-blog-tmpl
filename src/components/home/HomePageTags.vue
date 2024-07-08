<script setup>
import TagsList from "../TagsList.vue";
import { makeTagsList } from "../../helpers/listHelpers.js";
import UtilPageHeader from "../UtilPageHeader.vue";

const props = defineProps(["allData", "header"]);
const tagList = makeTagsList(props.allData || []);
const sorted = tagList.sort((a, b) => String(a.name).localeCompare(b.name));
</script>

<template>
  <UtilPageHeader>{{ props.header }}</UtilPageHeader>
  <TagsList :tags="sorted" :sizeXl="true" class="mb-14" />
</template>
