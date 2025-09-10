---
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
import { PROPS } from "../../../.vitepress/props.js";

const { theme, params, localeIndex } = useData()
const posts = inject('posts')
</script>

# {{params.year}} {{theme.t.year}}

<MonthsOfYear
  :allPosts="posts[localeIndex]"
  :year="params.year"
  :curPage="params.page"
  :perPage="PROPS.perPage"
  :paginationMaxItems="theme.paginationMaxItems"
/>
