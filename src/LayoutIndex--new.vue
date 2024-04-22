<!-- <script setup>
import { useData } from 'vitepress'
const { page, frontmatter } = useData()
</script>

<template>
  <h1>Custom Layout!</h1>

  <div v-if="page.isNotFound">
    Custom 404 page!
  </div>
  <Content v-else />
</template> -->

<script setup>
  import DefaultTheme from 'vitepress/theme'

  const { Layout } = DefaultTheme

</script>

<template>

  <Content />
  <!-- <Layout> -->
  <!--     <template #doc-before>doc before</template> -->
  <!--     <template #doc-after>doc after</template> -->
  <!-- </Layout> -->
</template>

