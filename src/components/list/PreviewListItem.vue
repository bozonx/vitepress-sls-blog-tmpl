<script setup>
import { useData } from "vitepress";
import { makeHumanDate } from "../../helpers/helpers.js";
import TagsList from "../TagsList.vue";
import PreviewWithImg from "./PreviewWithImg.vue";
import PreviewNoImg from "./PreviewNoImg.vue";

const { lang, theme } = useData();
const props = defineProps(["item"]);
const params = {
  pubDate: props.item.pubDate,
  tags: (props.item.tags || []).map((item) => ({ name: item })),
  localeDate: makeHumanDate(props.item.pubDate, lang.value),
  preview: String(props.item?.preview).trim().replace(/\.$/, "") + " ...",
  authorName:
    theme.value.showAuthorInPostList &&
    theme.value.authors.find((item) => item.id === props.item.authorId)?.name,
};
</script>

<template>
  <a :href="props.item.url"
    class="block mb-6 px-5 py-5 cursor-pointer bg-white dark:bg-gray-800 border rounded-lg border-gray-200 dark:border-gray-700 preview">
    <h4 class="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{ props.item.title }}
    </h4>

    <PreviewWithImg v-if="item.thumbnail" v-bind="params" :thumbnail="props.item.thumbnail" />
    <PreviewNoImg v-else v-bind="params" />
  </a>
</template>

<style scoped>
.preview:hover {
  filter: brightness(99%);
}

.dark .preview:hover {
  filter: brightness(110%);
}

.preview:visited h4 {
  color: var(--color-a-light-visited);
}
</style>
