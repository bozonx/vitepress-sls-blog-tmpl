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
import { inject } from 'vue'

const { theme, params, localeIndex } = useData()
const posts = inject('posts')
</script>

# {{theme.t.months[Number(params.month) - 1]}} {{params.year}}

<MonthPostsList
  :allPosts="posts[localeIndex]"
  :year="params.year"
  :month="params.month"
/>
