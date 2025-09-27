<script setup>
import { useData, useRoute } from 'vitepress'
import { arraysIntersection } from 'squidlet-lib'
import PreviewListItem from './PreviewListItem.vue'
import PreviewList from './PreviewList.vue'

const props = defineProps(['allPosts'])
const { frontmatter, theme } = useData()
const route = useRoute()
let items = []

if (frontmatter.value.tags) {
  // Функция для получения пересечения тегов по slug
  const getTagsIntersection = (tags1, tags2) => {
    // Проверяем, что оба массива существуют и являются массивами
    if (!Array.isArray(tags1) || !Array.isArray(tags2)) {
      return []
    }

    const slugs1 = tags1.map((tag) => tag?.slug).filter(Boolean)
    const slugs2 = tags2.map((tag) => tag?.slug).filter(Boolean)

    return arraysIntersection(slugs1, slugs2)
  }

  // Функция для получения значения популярности поста
  const getPopularityValue = (post) => {
    const sortBy = theme.value.popularPosts?.sortBy
    if (!sortBy) return 0

    const stats = post.analyticsStats?.[sortBy]
    return stats !== undefined && stats !== null ? stats : 0
  }

  items = [...(props.allPosts || [])]
    .filter((item) => {
      // Исключаем текущий пост
      const isCurrentPost = item.url === route.path
      if (isCurrentPost) return false

      // Проверяем наличие тегов у поста
      if (!item.tags || !Array.isArray(item.tags)) return false

      // Проверяем пересечение тегов
      const intersection = getTagsIntersection(
        item.tags,
        frontmatter.value.tags
      )
      return intersection.length > 0
    })
    .sort((a, b) => {
      // Сортируем по количеству совпадающих тегов (больше совпадений - выше)
      const aIntersection = getTagsIntersection(
        a.tags,
        frontmatter.value.tags
      ).length
      const bIntersection = getTagsIntersection(
        b.tags,
        frontmatter.value.tags
      ).length

      if (aIntersection !== bIntersection) {
        return bIntersection - aIntersection
      }

      // Если количество совпадений одинаковое, сортируем по популярности
      const aPopularity = getPopularityValue(a)
      const bPopularity = getPopularityValue(b)

      if (aPopularity !== bPopularity) {
        return bPopularity - aPopularity
      }

      // Если популярность одинаковая, сортируем по дате (новые сверху)
      return new Date(b.date) - new Date(a.date)
    })
    .slice(0, theme.value.similarPostsCount)
}
</script>

<template>
  <div v-if="items.length">
    <h2 class="text-xl font-bold mb-4">{{ theme.t.similarPosts }}</h2>

    <PreviewList
      :allPosts="items"
      :curPage="1"
      :perPage="theme.similarPostsCount"
      :paginationMaxItems="theme.paginationMaxItems"
    />
  </div>
</template>
