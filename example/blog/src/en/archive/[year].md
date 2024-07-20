---
layout: util
---

<script setup>
import { useData } from 'vitepress'
import MonthsOfYear from 'vitepress-sls-blog-tmpl/MonthsOfYear.vue'
import { data } from '../loadPosts.data.js'

const { theme, params } = useData()
</script>

# {{params.year}} {{theme.t.year}}

<MonthsOfYear :allPosts="data.posts" :year="params.year" />
