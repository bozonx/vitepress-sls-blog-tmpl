---
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

const { theme, localeIndex } = useData()
const posts = inject('posts')
</script>

# {{theme.t.allTags}}

<AllTagsList :allPosts="posts[localeIndex]" />
