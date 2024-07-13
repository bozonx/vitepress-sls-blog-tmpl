---
layout: util
---

<script setup>
import Years from 'vitepress-sls-blog-tmpl/src/components/list/Years.vue'
import { useData } from 'vitepress'
import { data } from './loadPosts.data.js'

const { theme } = useData()
</script>

# {{theme.t.links.byDate}}

<Years :allPosts="data.posts" />
