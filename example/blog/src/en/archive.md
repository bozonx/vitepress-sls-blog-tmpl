---
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

const { theme, localeIndex } = useData()
const posts = inject('posts')
</script>

# {{theme.t.links.byDate}}

<Years :allPosts="posts[localeIndex]" />
