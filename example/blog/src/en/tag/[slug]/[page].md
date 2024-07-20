---
layout: util
---

<script setup>
import TagPostsList from 'vitepress-sls-blog-tmpl/TagPostsList.vue'
import { useData } from 'vitepress'
import { data } from '../../loadPosts.data.js'
import { PROPS } from "../../../.vitepress/props.js";

const { theme, params, title, page } = useData()
</script>

# {{theme.t.tagPageHeader}}: {{params.name}}

<TagPostsList
  :allData="data.posts"
  :curPage="params.page"
  :perPage="PROPS.perPage"
  :paginationMaxItems="PROPS.paginationMaxItems"
  :tagName="params.name"
  :tagSlug="params.slug"
/>
