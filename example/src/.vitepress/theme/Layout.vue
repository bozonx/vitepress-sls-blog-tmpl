<script setup>
import Theme from "vitepress-sls-blog-tmpl";
import SideBarTags from "vitepress-sls-blog-tmpl/src/components/list/SideBarTags.vue";
import { useData } from "vitepress";

const { page } = useData();
const { Layout } = Theme;
</script>

<template>
  <Layout></Layout>
</template>
