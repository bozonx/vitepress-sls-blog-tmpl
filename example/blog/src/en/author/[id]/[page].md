---
layout: util
---

<script setup>
import AuthorDetails from 'vitepress-sls-blog-tmpl/AuthorDetails.vue'
import { useData } from 'vitepress'
import { data } from '../../loadPosts.data.js'
import { PROPS } from "../../../.vitepress/props.js";

const { theme, params } = useData()
</script>

# {{theme.authors.find((item) => item.id === params.id)?.name}}

<AuthorDetails
  :allPosts="data.posts"
  :authorId="params.id"
  :curPage="params.page"
  :perPage="PROPS.perPage"
  :paginationMaxItems="PROPS.paginationMaxItems"
/>
