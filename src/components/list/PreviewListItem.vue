<script setup>
import { useData } from "vitepress";
import TagsList from "../TagsList.vue";
import { makeHumanDate } from "../../helpers/helpers.js";

const { lang, theme } = useData();
const props = defineProps(["item"]);
const tags = (props.item.tags || []).map((item) => ({ name: item }));
const localeDate = makeHumanDate(props.item.pubDate, lang.value);
const authorName =
  theme.value.showAuthorInPostList &&
  theme.value.authors.find((item) => item.id === props.item.authorId)?.name;
</script>

<template>
  <a :href="props.item.url"
    class="block mb-6 px-5 py-5 cursor-pointer bg-white dark:bg-gray-800 border rounded-lg border-gray-200 dark:border-gray-700 page-list-item">
    <h4 class="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{ props.item.title }}
    </h4>
    <div class="md:flex w-full">
      <div v-if="props.item.thumbUrl" class="md:mr-4">
        <!-- <a :href="item.url"> -->
        <!-- <Img -->
        <!--   class="w-80" -->
        <!--   src={thumbUrl} -->
        <!--   loading="lazy" -->
        <!--   alt="{title} thumbnail" -->
        <!-- /> -->
        <!-- </a> -->

        <div class="mt-2 text-sm text-gray-500 dark:text-gray-400 space-x-2">
          <span v-if="authorName">{{ authorName }}.</span>
          <time v-if="props.item.pubDate" :datetime="props.item.pubDate">
            {{ localeDate }}
          </time>
        </div>

        <TagsList :tags="tags" class="mt-2" :sizeSm="true" />
      </div>

      <span class="max-md:mt-5 flex-1 block font-normal text-gray-700 dark:text-gray-400 leading-tight">
        <p>{{ String(props.item?.preview).trim().replace(/\.$/, "") }} ...</p>
        <!-- <p>...</p> -->
      </span>
    </div>

    <div v-if="!props.item.thumbUrl" class="flex items-end mt-4">
      <TagsList :tags="tags" class="flex-1 mr-2" :sizeSm="true" />

      <div class="text-sm text-gray-500 dark:text-gray-400 space-x-2">
        <span v-if="authorName">{{ authorName }}.</span>
        <time v-if="props.item.pubDate" :datetime="props.item.pubDate">
          {{ localeDate }}
        </time>
      </div>
    </div>
  </a>
</template>

<style>
.page-list-item:hover {
  filter: brightness(99%);
}

.dark .page-list-item:hover {
  filter: brightness(110%);
}

.page-list-item:visited h4 {
  color: var(--color-a-light-visited);
}
</style>
