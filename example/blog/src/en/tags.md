---
title: "{{theme.t.allTags}}"
layout: util
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import { useData } from 'vitepress'
import { inject } from 'vue'
import AllTagsList from 'vitepress-sls-blog-tmpl/AllTagsList.vue'

const { localeIndex, frontmatter } = useData()
const posts = inject('posts')
</script>

# {{frontmatter.title}}

<AllTagsList :allPosts="posts[localeIndex]" />
