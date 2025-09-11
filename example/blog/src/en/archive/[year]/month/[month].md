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
import { inject } from 'vue'

const { params, localeIndex, frontmatter} = useData()
const posts = inject('posts')
</script>

# {{frontmatter.title}}

<MonthPostsList
  :allPosts="posts[localeIndex]"
  :year="params.year"
  :month="params.month"
/>
