---
layout: util
---

<script setup>
import Authors from 'vitepress-sls-blog-tmpl/src/components/list/Authors.vue'
import { useData } from 'vitepress'
import { data } from './loadPosts.data.js'

const { theme } = useData()
</script>

# {{theme.t.links.authors}}

<Authors :allPosts="data.posts" />
