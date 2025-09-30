---
title: "{{theme.t.popularPosts}}"
layout: util
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import PopularPostsList from 'vitepress-sls-blog-tmpl/PopularPostsList.vue'
import { useData } from 'vitepress'

const { params } = useData()
</script>

<PopularPostsList
  :curPage="params.page"
/>
