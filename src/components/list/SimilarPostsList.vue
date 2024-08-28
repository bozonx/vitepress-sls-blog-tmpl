<script setup>
import ListItemWithBadge from "./ListItemWithBadge.vue";
import { arraysIntersection } from "../../helpers/helpers.js";

const props = defineProps(["allData"]);
const { frontmatter, theme } = useData();
let items = [];

if (frontmatter.value.tags) {
  items = [...(props.allData || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter(
      (item) => arraysIntersection(item.tags, frontmatter.value.tags).length,
    )
    // TODO: отсортировать так чтобы если больше вхождений тэгов то сверху
    .slice(0, theme.value.similarPostsCount)
    .map((item) => ({
      href: item.url,
      text: item.title,
    }));
}
</script>

<template>
  <ul v-if="items.length">
    <li v-for="item in items">
      <ListItemWithBadge :item="item" />
    </li>
  </ul>
</template>
