<script setup>
import { useData, useRoute } from 'vitepress'

import { makeMonthsList } from '../../list-helpers/listHelpers.js'
import { sortPosts } from '../../helpers/helpers.js'
import ListItemWithBadge from './ListItemWithBadge.vue'
import PreviewList from './PreviewList.vue'
import UtilPageHeader from '../UtilPageHeader.vue'
import ListPageHeader from '../ListPageHeader.vue'

const props = defineProps([
  'allPosts',
  'year',
  'curPage',
  'perPage',
  'paginationMaxItems',
])
const { theme, frontmatter, localeIndex } = useData()
const route = useRoute()
const monthsList = makeMonthsList(props.allPosts, props.year)

const curPage = Number(props.curPage || 1)
// Фильтруем посты по году
const filtered = props.allPosts.filter((item) => {
  const postYear = new Date(item.date).getUTCFullYear()
  return postYear === Number(props.year)
})

// Проверяем, есть ли в роуте /popular/
const isPopularRoute = route.path.includes(`/${theme.value.popularBaseUrl}/`)
const sorted = sortPosts(
  filtered,
  theme.value.popularPosts?.sortBy,
  isPopularRoute
)
</script>

<template>
  <div>
    <UtilPageHeader>{{ frontmatter.title }}</UtilPageHeader>

    <ul v-if="monthsList.length">
      <template v-for="item in monthsList">
        <li v-if="item.count">
          <ListItemWithBadge
            :href="`${theme.archiveBaseUrl}/${props.year}/month/${item.month}`"
            :text="theme.t.months[item.month - 1]"
            :count="item.count"
          />
        </li>
      </template>
    </ul>

    <ListPageHeader
      :baseUrl="`/${localeIndex}/${theme.archiveBaseUrl}/${props.year}`"
      class="mt-10"
    >
      {{ theme.t.allPostsOfYear }}
    </ListPageHeader>

    <PreviewList
      :allPosts="sorted"
      :curPage="curPage"
      :perPage="props.perPage"
      :paginationMaxItems="props.paginationMaxItems"
    />
  </div>
</template>
