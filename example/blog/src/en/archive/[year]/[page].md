---
title: "{{params.year}} {{theme.t.year}}"
layout: util
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import { useData } from 'vitepress'
import MonthsOfYear from 'vitepress-sls-blog-tmpl/MonthsOfYear.vue'
import { inject } from 'vue'

const { theme, params, localeIndex, frontmatter } = useData()
const posts = inject('posts')
</script>

# {{frontmatter.title}}

<MonthsOfYear
  :allPosts="posts[localeIndex]"
  :year="params.year"
  :curPage="params.page"
  :perPage="theme.perPage"
  :paginationMaxItems="theme.paginationMaxItems"
/>
