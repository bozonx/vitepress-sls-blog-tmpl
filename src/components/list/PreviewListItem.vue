<script setup>
import { useData } from "vitepress";
import { makeHumanDate } from "../../helpers/helpers.js";
import PreviewWithImg from "./PreviewWithImg.vue";
import PreviewNoImg from "./PreviewNoImg.vue";

const { lang, theme } = useData();
const props = defineProps(["item"]);
const params = {
  tags: props.item.tags,
  date: props.item.date,
  localeDate: makeHumanDate(props.item.date, lang.value),
  preview: String(props.item?.preview).trim().replace(/\.$/, "") + " ...",
  authorName:
    theme.value.showAuthorInPostList &&
    theme.value.authors.find((item) => item.id === props.item.authorId)?.name,
};
</script>

<template>
  <a :href="props.item.url" class="mb-6 px-5 py-5 preview">
    <h2 class="mb-3 text-2xl tracking-tight">{{ props.item.title }}</h2>

    <PreviewWithImg v-if="item.thumbnail" v-bind="params" :thumbnail="props.item.thumbnail" />
    <PreviewNoImg v-else v-bind="params" />
  </a>
</template>

<style scoped>
.preview {
  display: block;
  cursor: pointer;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 0.6rem;
  line-height: 1.4;
  font-weight: 400;
}

.dark .preview {
  background: var(--gray-850);
  border-color: var(--gray-800);
}

.preview:hover {
  filter: brightness(99%);
}

.dark .preview:hover {
  filter: brightness(110%);
}

.preview h2 {
  font-weight: bold;
}

.preview:visited h2 {
  color: var(--color-a-light-visited);
}
</style>
