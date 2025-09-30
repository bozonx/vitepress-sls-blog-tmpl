---
title: "{{theme.t.months[params.month - 1]}} {{params.year}}"
layout: util
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import MonthPostsList from 'vitepress-sls-blog-tmpl/MonthPostsList.vue'
import { useData } from 'vitepress'

const { params } = useData()
</script>

<MonthPostsList
  :year="params.year"
  :month="params.month"
/>
