<script setup>
import { useData } from "vitepress";
import TagsList from "../TagsList.vue";
import SimpleLink from "../SimpleLink.vue";

const props = defineProps(["class"]);
const { theme, frontmatter } = useData();
const tags =
  [...(frontmatter.value.tags || [])].sort().map((name) => ({ name })) || [];
</script>

<template>
  <div v-if="frontmatter.tags?.length" :class="[props.class]">
    <h4 class="mb-3 font-bold text-base muted">{{ theme.t.tags }}:</h4>

    <TagsList :tags="tags" />

    <div class="mt-4">
      <SimpleLink :href="theme.allTagsUrl">{{
        theme.t.allTagsCall
        }}</SimpleLink>
    </div>
  </div>
</template>
