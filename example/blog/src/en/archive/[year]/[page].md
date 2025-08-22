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
import { data } from '../../loadPosts.data.js'
import { PROPS } from "../../../.vitepress/props.js";

const { theme, params } = useData()
</script>

# {{params.year}} {{theme.t.year}}

<MonthsOfYear 
  :allPosts="data.posts"
  :year="params.year"
  :curPage="params.page"
  :perPage="PROPS.perPage"
  :paginationMaxItems="theme.paginationMaxItems"
/>
