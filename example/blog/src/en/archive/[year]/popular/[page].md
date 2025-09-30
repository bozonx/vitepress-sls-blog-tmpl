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

const { params } = useData()
</script>

<MonthsOfYear
  :year="params.year"
  :curPage="params.page"
  :showPopularPostsSwitch="true"
/>
