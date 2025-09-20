---
title: "{{theme.authors.find((item) => item.id === params.id)?.
name}}"
layout: util
---

<script setup>
import AuthorDetails from 'vitepress-sls-blog-tmpl/AuthorDetails.vue'
import { useData } from 'vitepress'
import { inject } from 'vue'

const { theme, params, localeIndex, frontmatter } = useData()
const posts = inject('posts')
</script>

# {{frontmatter.title}}

<AuthorDetails
  :allPosts="posts[localeIndex]"
  :authorId="params.id"
  :curPage="params.page"
  :perPage="theme.perPage"
  :paginationMaxItems="theme.paginationMaxItems"
/>
