<script setup>
import { useData } from 'vitepress'
import PreviewList from './PreviewList.vue'

const props = defineProps([
  'allPosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
])
const { theme } = useData()
const curPage = Number(props.curPage)
const sortBy = theme.value.popularPosts?.sortBy || 'pageviews'
const perPage = props.perPage || theme.value.perPage
const paginationMaxItems =
  props.paginationMaxItems || theme.value.paginationMaxItems

// Получаем посты с аналитикой и сортируем их
const posts = [...(props.allPosts || [])]
  // .filter((post) => post.analyticsStats) // Только посты с данными аналитики
  .sort((a, b) => {
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

      // Для bounceRate сортируем по возрастанию (меньше = лучше)
      if (sortBy === 'bounceRate') {
        return aValue - bValue
      }

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
  })
  .slice(0, theme.value.perPage)
</script>

<template>
  <!-- <div v-if="posts.length">
    <ul>
      <li v-for="item in posts" :key="item.url">
        <PreviewListItem :item="item" />
      </li>
    </ul>
  </div> -->

  <PreviewList
    :allPosts="posts"
    :curPage="curPage"
    :perPage="perPage"
    :paginationMaxItems="paginationMaxItems"
    :paginationBaseUrl="theme.popularBaseUrl"
  />
</template>
