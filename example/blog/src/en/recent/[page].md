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
import { inject } from 'vue'
import { PROPS } from "../../.vitepress/props.js";

const { theme, params, localeIndex } = useData()
const posts = inject('posts')
</script>

# {{theme.t.allPosts}}

<RecentList
  :allPosts="posts[localeIndex]"
  :curPage="params.page"
  :perPage="PROPS.perPage"
  :paginationMaxItems="theme.paginationMaxItems"
/>
