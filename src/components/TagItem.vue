<script setup>
import { useData } from "vitepress";
import BaseLink from "./BaseLink.vue";
import Badge from "./Badge.vue";
import { transliterate } from "../helpers/transliterate.js";

const { theme } = useData();
const props = defineProps(["text", "count", "sizeXl", "sizeSm"]);
const preparedTag = transliterate(props.text);
const href = `${theme.value.tagsBaseUrl}/${preparedTag}/1`;
const className =
  "text-center font-medium rounded-full text-lg py-1 px-4 " +
  "justify-center inline-flex space-x-2 items-center text-white " +
  (props.sizeXl ? `text-xl ` : "") +
  (props.sizeSm ? `text-sm ` : "") +
  (props.count ? "pr-2 " : "") +
  `tag-item`;
</script>

<template>
  <BaseLink :href="href" :class="className">
    <span>{{ props.text }}</span>
    <Badge v-if="props.count" :count="props.count" :title="theme.t.tagBadgeCount" />
  </BaseLink>
</template>

<style scoped>
.tag-item {
  background: var(--tag-item-bg);
}

.tag-item.active {
  background: var(--tag-item-bg-active);
}

.tag-item:hover {
  filter: brightness(115%);
}
</style>
