<script setup>
import { useData } from "vitepress";
import TagsList from "../TagsList.vue";
import SimpleLink from "../SimpleLink.vue";

const { theme, frontmatter } = useData();
const tags = [...(frontmatter.value.tags || [])].sort((a, b) =>
  String(a.name).localeCompare(b.name),
);
</script>

<template>
  <div v-if="frontmatter.tags?.length">
    <div class="md:flex">
      <p class="md:mt-1 md:mr-2 max-md:mb-3 muted">{{ theme.t.tags }}:</p>

      <TagsList :tags="tags" />
    </div>

    <div class="mt-4">
      <SimpleLink :href="theme.tagsBaseUrl">{{
        theme.t.allTagsCall
        }}</SimpleLink>
    </div>
  </div>
</template>
