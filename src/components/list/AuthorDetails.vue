<script setup>
import { useData, useRoute } from 'vitepress'

import Author from '../Author.vue'
import ListPageHeader from '../ListPageHeader.vue'
import PreviewList from './PreviewList.vue'

const { localeIndex, theme } = useData()
const route = useRoute()
const props = defineProps([
  'allPosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
  'authorId',
])
const curPage = Number(props.curPage)
const items = props.allPosts.filter((post) => post.authorId === props.authorId)

// Проверяем, есть ли в роуте /popular/
const isPopularRoute = route.path.includes('/popular/')

// Определяем параметр сортировки по популярности из темы
const sortBy = theme.value.popularPosts?.sortBy || 'pageviews'

// Условная сортировка: по популярности если есть /popular/, иначе по дате
const sorted = [...(items || [])].sort((a, b) => {
  if (isPopularRoute) {
    // Сортировка по популярности (логика из PopularPostsList.vue)
    const aHasStats =
      a.analyticsStats?.[sortBy] !== undefined &&
      a.analyticsStats?.[sortBy] !== null
    const bHasStats =
      b.analyticsStats?.[sortBy] !== undefined &&
      b.analyticsStats?.[sortBy] !== null

    // Если у обоих постов есть статистика, сортируем по ней
    if (aHasStats && bHasStats) {
      const aValue = a.analyticsStats[sortBy]
      const bValue = b.analyticsStats[sortBy]

      // Для остальных метрик сортируем по убыванию (больше = лучше)
      return bValue - aValue
    }

    // Если у одного есть статистика, а у другого нет - приоритет у того, у кого есть
    if (aHasStats && !bHasStats) return -1
    if (!aHasStats && bHasStats) return 1

    // Если у обоих нет статистики, сортируем по дате (новые сначала)
    const aDate = new Date(a.date || 0)
    const bDate = new Date(b.date || 0)
    return bDate - aDate
  } else {
    // Обычная сортировка по дате (новые сначала)
    return new Date(b.date) - new Date(a.date)
  }
})

const author = theme.value.authors.find((item) => item.id === props.authorId)
</script>

<template>
  <Author :author="author" class="mb-15" />

  <ListPageHeader
    :baseUrl="`/${localeIndex}/${theme.authorBaseUrl}/${props.authorId}`"
  >
    {{ theme.t.allPostsOfAuthor }}
  </ListPageHeader>

  <PreviewList
    :allPosts="sorted"
    :curPage="curPage"
    :perPage="props.perPage"
    :paginationMaxItems="props.paginationMaxItems"
  />
</template>
