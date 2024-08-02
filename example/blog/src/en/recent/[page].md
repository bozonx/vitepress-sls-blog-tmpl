---
layout: util
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import RecentList from 'vitepress-sls-blog-tmpl/RecentList.vue'
import { useData } from 'vitepress'
import { data } from '../loadPosts.data.js'
import { PROPS } from "../../.vitepress/props.js";

const { theme, params } = useData()
</script>

# {{theme.t.allPosts}}

<RecentList
  :allData="data.posts"
  :curPage="params.page"
  :perPage="PROPS.perPage"
  :paginationMaxItems="PROPS.paginationMaxItems"
/>
