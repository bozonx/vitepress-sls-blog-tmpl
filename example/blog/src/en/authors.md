---
title: "{{theme.t.links.authors}}"
layout: util
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import Authors from 'vitepress-sls-blog-tmpl/Authors.vue'
import { useData } from 'vitepress'
import { inject } from 'vue'

const { localeIndex, frontmatter } = useData()
const posts = inject('posts')
</script>

# {{frontmatter.title}}

<Authors :allPosts="posts[localeIndex]" />
