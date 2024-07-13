---
layout: util
---

<script setup>
import { useData } from 'vitepress'
import AllTagsList from 'vitepress-sls-blog-tmpl/src/components/list/AllTagsList.vue'
import { data } from './loadPosts.data.js'

const { theme } = useData()
</script>

# {{theme.t.links.allTags}}

<AllTagsList :allPosts="data.posts" />
