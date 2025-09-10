---
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

const { theme, localeIndex } = useData()
const posts = inject('posts')
</script>

# {{theme.t.links.authors}}

<Authors :allPosts="posts[localeIndex]" />
