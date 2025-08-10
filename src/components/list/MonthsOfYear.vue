<script setup>
import { useData } from "vitepress";
import ListItemWithBadge from "./ListItemWithBadge.vue";
import { makeMonthsList } from "../../page-helpers/listHelpers.js";

const props = defineProps(["allPosts", "year", "class"]);
const { theme } = useData();
const monthsList = makeMonthsList(props.allPosts, props.year);
</script>

<template>
  <ul v-if="monthsList.length" class="props.class">
    <template v-for="item in monthsList">
      <li v-if="item.count">
        <ListItemWithBadge :href="`${theme.archiveBaseUrl}/${props.year}/${item.month}`"
          :text="theme.t.months[item.month - 1]" :count="item.count" />
      </li>
    </template>
  </ul>
</template>
