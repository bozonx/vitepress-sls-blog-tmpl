---
title: "{{theme.t.links.byDate}}"
layout: util
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import Years from 'vitepress-sls-blog-tmpl/Years.vue'
import { useData } from 'vitepress'
import { inject } from 'vue'

const { localeIndex, frontmatter } = useData()
const posts = inject('posts')
</script>

# {{frontmatter.title}}

<Years :allPosts="posts[localeIndex]" />
