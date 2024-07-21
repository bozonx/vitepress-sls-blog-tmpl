<script setup>
import { useData } from "vitepress";
import { ref, watchEffect } from "vue";
import { resolveArticlePreview } from "../helpers/helpers.js";
import PostFooter from "./post/PostFooter.vue";
import PostDate from "./post/PostDate.vue";
import PostTopBar from "./post/PostTopBar.vue";
import PostImage from "./post/PostImage.vue";

const { page, frontmatter } = useData();
const articlePreviewText = ref(null);

watchEffect(async () => {
  articlePreviewText.value = resolveArticlePreview(frontmatter.value);
});
</script>

<template>
  <div v-if="frontmatter.layout === 'page'" class="content-page">
    <div class="simple-page vp-doc">
      <Content />
    </div>
  </div>
  <div v-else-if="frontmatter.layout === 'util'" class="content-page">
    <div class="simple-page">
      <Content />
    </div>
  </div>
  <article v-else class="content-page">
    <h1 v-if="page.title" class="text-4xl max-md:text-2xl mb-5 tracking-tight">
      {{ page.title }}
    </h1>

    <PostDate class="mt-4" />
    <PostTopBar class="mt-10" />

    <div v-if="articlePreviewText" class="mt-10 italic">
      {{ articlePreviewText }}
    </div>

    <PostImage :src="frontmatter.cover" :descr="frontmatter.coverDescr" :alt="frontmatter.coverAlt" />

    <div class="mt-10 vp-doc">
      <Content />
    </div>

    <PostFooter />
  </article>
</template>
