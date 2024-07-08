---
layout: util
---

<script setup>
import AuthorDetails from 'vitepress-sls-blog-tmpl/src/components/list/AuthorDetails.vue'
import { useData } from 'vitepress'
import { data } from '../../loadPosts.data.js'
import { commonParams } from '../../../.vitepress/themeLocaleconfig.js'

const { theme, params } = useData()
</script>

# {{theme.authors.find((item) => item.id === params.id)?.name}}

<AuthorDetails
  :allPosts="data.posts"
  :authorId="params.id"
  :curPage="params.page"
  :perPage="commonParams.perPage"
  :paginationMaxItems="commonParams.paginationMaxItems"
/>
