<script setup>
import { useData } from "vitepress";
import { makeHumanDate } from "../../helpers/helpers.js";
import BaseLink from "../BaseLink.vue";

const props = defineProps(["class"]);
const { page, theme, lang } = useData();
const rawDate = page.value.frontmatter.date;
// const rawDateSplit = rawDate.split("-");
// const year = Number(rawDateSplit[0]);
const year = new Date(rawDate)?.getUTCFullYear();
// const month = Number(rawDateSplit[1]);
const month = new Date(rawDate)?.getUTCMonth() + 1;
const localeDate = makeHumanDate(rawDate, lang.value);
</script>

<template>
  <div v-if="rawDate" :class="['text-base muted post-date', props.class]">
    <time :datetime="rawDate" class="space-x-1">
      <template v-for="item in localeDate.split(' ')">
        <BaseLink :href="`${theme.archiveBaseUrl}/${item}`" v-if="item.match(/^\d{4,4}$/)">
          {{ item }}
        </BaseLink>
        <BaseLink :href="`${theme.archiveBaseUrl}/${year}/${month}`" v-else-if="item.match(/^[^\d\.\-\,]{2,}$/)">
          {{ item }}
        </BaseLink>
        <span v-else>{{ item }}</span>
      </template>
    </time>
  </div>
</template>

<style scoped>
.post-date a {
  text-decoration: underline;
}

.post-date a:hover {
  filter: brightness(140%);
}
</style>
