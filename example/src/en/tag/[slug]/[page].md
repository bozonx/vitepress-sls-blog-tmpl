---
layout: util
---

<script setup>
import TagPostsList from 'vitepress-sls-blog-tmpl/src/components/list/TagPostsList.vue'
import { useData } from 'vitepress'
import { data } from '../../loadPosts.data.js'
import { commonParams } from '../../../.vitepress/themeLocaleconfig.js'

const { theme, params, title, page } = useData()
</script>

# {{theme.t.tagPageHeader}}: {{params.name}}

<TagPostsList
  :allData="data.posts"
  :curPage="params.page"
  :perPage="commonParams.perPage"
  :paginationMaxItems="commonParams.paginationMaxItems"
  :tagName="params.name"
  :tagSlug="params.slug"
/>
