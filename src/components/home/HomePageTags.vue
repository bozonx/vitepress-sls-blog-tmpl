<script setup>
import TagsList from "../TagsList.vue";
import { makeTagsList } from "../../helpers/listHelpers.js";

const props = defineProps(["allData"]);
const tagList = makeTagsList(props.allData || []);
</script>

<template>
  <TagsList :tags="tagList" :sizeXl="true" class="mb-14" />
</template>
