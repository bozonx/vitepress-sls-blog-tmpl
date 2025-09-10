---
layout: util
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import AuthorDetails from 'vitepress-sls-blog-tmpl/AuthorDetails.vue'
import { useData } from 'vitepress'
import { inject } from 'vue'
import { PROPS } from "../../../.vitepress/props.js";

const { theme, params, localeIndex } = useData()
const posts = inject('posts')
</script>

# {{theme.authors.find((item) => item.id === params.id)?.name}}

<AuthorDetails
  :allPosts="posts[localeIndex]"
  :authorId="params.id"
  :curPage="params.page"
  :perPage="PROPS.perPage"
  :paginationMaxItems="theme.paginationMaxItems"
/>
