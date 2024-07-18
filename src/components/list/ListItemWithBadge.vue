<script setup>
import { useData } from "vitepress";
import SimpleLink from "../SimpleLink.vue";
import Badge from "../Badge.vue";
import { makeYearsList } from "../../helpers/listHelpers.js";

const props = defineProps(["href", "text", "count"]);
</script>

<template>
  <SimpleLink :href="props.href" class="no-underline text-2xl my-5 inline-flex gap-x-2">
    <span>{{ props.text }}</span>
    <Badge :count="props.count" />
  </SimpleLink>
</template>
