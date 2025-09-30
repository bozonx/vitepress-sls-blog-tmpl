---
title: "{{theme.authors.find((item) => item.id === params.id)?.
name}}"
layout: util
---

<script setup>
import AuthorDetails from 'vitepress-sls-blog-tmpl/AuthorDetails.vue'
import { useData } from 'vitepress'

const { params } = useData()
</script>

<AuthorDetails
  :authorId="params.id"
  :curPage="params.page"
  :showPopularPostsSwitch="true"
/>
