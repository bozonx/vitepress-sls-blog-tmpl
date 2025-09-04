---
layout: util
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import MonthPostsList from 'vitepress-sls-blog-tmpl/MonthPostsList.vue'
import { useData } from 'vitepress'
import { data } from '../../../loadPosts.data.js'

const { theme, params } = useData()
</script>

# {{theme.t.months[Number(params.month) - 1]}} {{params.year}}

<MonthPostsList :allPosts="data.posts" :year="params.year" :month="params.month" />
