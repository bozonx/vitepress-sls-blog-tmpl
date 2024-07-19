<script setup>
import Theme from "vitepress-sls-blog-tmpl";
import { useData } from "vitepress";

const { theme } = useData();
const { Layout } = Theme;
</script>

<template>
  <Layout>
    <template #sidebar-logo>
      <img src="/img/sidebar-logo.webp" :alt="theme.siteLogoAlt" />
    </template>
  </Layout>
</template>
