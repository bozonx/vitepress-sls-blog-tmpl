---
layout: util
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import { useData } from 'vitepress'
import AllTagsList from 'vitepress-sls-blog-tmpl/AllTagsList.vue'
import { data } from './loadPosts.data.js'

const { theme } = useData()
</script>

# {{theme.t.allTags}}

<AllTagsList :allPosts="data.posts" />
