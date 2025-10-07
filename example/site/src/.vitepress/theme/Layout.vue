<script setup>
  import DefaultTheme from "vitepress/theme";
  import PageFindSearch from "vitepress-sls-blog-tmpl/PageFindSearch.vue";
  import NavSearchButton from "vitepress-sls-blog-tmpl/NavSearchButton.vue";

  const { Layout: DefaultLayout } = DefaultTheme;
</script>

<template>
  <div id="modals"></div>

  <DefaultLayout>
    <template #nav-bar-content-before>
      <PageFindSearch>
        <NavSearchButton />
      </PageFindSearch>
    </template>
  </DefaultLayout>
</template>
