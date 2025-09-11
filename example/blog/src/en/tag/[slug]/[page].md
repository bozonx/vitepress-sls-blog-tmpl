---
title: "{{theme.t.tagPageHeader}}: {{params.name}}"
layout: util
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import TagPostsList from 'vitepress-sls-blog-tmpl/TagPostsList.vue'
import { useData } from 'vitepress'
import { inject } from 'vue'
import { PROPS } from "../../../.vitepress/props.js";

const { theme, params, localeIndex, frontmatter } = useData()
const posts = inject('posts')
</script>

# {{frontmatter.title}}

<TagPostsList
  :allPosts="posts[localeIndex]"
  :curPage="params.page"
  :perPage="PROPS.perPage"
  :paginationMaxItems="theme.paginationMaxItems"
  :tagName="params.name"
  :tagSlug="params.slug"
/>
