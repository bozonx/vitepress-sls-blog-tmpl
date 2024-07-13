---
layout: util
---

<script setup>
import RecentList from 'vitepress-sls-blog-tmpl/src/components/list/RecentList.vue'
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
