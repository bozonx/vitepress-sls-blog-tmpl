<script setup>
import { useData } from "vitepress";
import SimpleLink from "../SimpleLink.vue";

const props = defineProps(["class"]);
const { frontmatter, theme } = useData();
const themeAuthor = frontmatter.value.authorId
  ? theme.value.authors?.find((item) => item.id === frontmatter.value.authorId)
  : undefined;
const authorUrl = themeAuthor?.link
  ? themeAuthor.link
  : `${theme.value.authorBaseUrl}/${frontmatter.value.authorId}/1`;
</script>

<template>
  <address v-if="themeAuthor?.name" :class="['flex gap-x-1', props.class]">
    <span class="muted">{{ theme.t.author }}: </span>
    <SimpleLink rel="author" :href="authorUrl">{{
      themeAuthor.name
      }}</SimpleLink>
  </address>
</template>
