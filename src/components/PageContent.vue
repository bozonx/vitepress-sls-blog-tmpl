<script setup>
import { useData } from "vitepress";
import { resolveArticlePreview } from "../helpers/helpers.js";
import PostFooter from "./post/PostFooter.vue";
import PostDate from "./post/PostDate.vue";
import PostTopBar from "./post/PostTopBar.vue";

const { page, frontmatter } = useData();
const articlePreviewText = resolveArticlePreview(frontmatter.value);
</script>

<template>
  <div v-if="frontmatter.layout === 'page'">
    <!-- <h1 v-if="page.title">{{page.title}}</h1> -->
    <div class="simple-page">
      <Content />
    </div>
  </div>
  <article v-else>
    <h1 v-if="page.title" class="text-4xl max-md:text-2xl mb-5 tracking-tight">
      {{ page.title }}
    </h1>

    <PostDate class="mt-6" />
    <PostTopBar class="mt-6" />

    <div v-if="articlePreviewText" class="mt-10 italic">
      {{ articlePreviewText }}
    </div>

    <div class="mt-10 vp-doc">
      <Content />
    </div>

    <PostFooter />
  </article>
</template>
