<script setup>
import { useData, useRoute } from 'vitepress'
import { arraysIntersection } from 'squidlet-lib'
import PreviewListItem from './PreviewListItem.vue'

const props = defineProps(['allPosts'])
const { frontmatter, theme, page } = useData()
const route = useRoute()
let items = []

if (frontmatter.value.tags) {
  // Функция для получения пересечения тегов по slug
  const getTagsIntersection = (tags1, tags2) => {
    const slugs1 = tags1.map((tag) => tag.slug)
    const slugs2 = tags2.map((tag) => tag.slug)
    return arraysIntersection(slugs1, slugs2)
  }

  items = [...(props.allPosts || [])]
    .filter((item) => {
      // Исключаем текущий пост из списка похожих
      const isCurrentPost =
        item.url === route.path ||
        item.url === page.value.relativePath?.replace(/\.md$/, '') ||
        item.url === `/${page.value.relativePath?.replace(/\.md$/, '')}`

      return (
        !isCurrentPost &&
        getTagsIntersection(item.tags, frontmatter.value.tags).length > 0
      )
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

      // Если количество совпадений одинаковое, сортируем по дате (новые сверху)
      return new Date(b.date) - new Date(a.date)
    })
    .slice(0, theme.value.similarPostsCount)
}
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-4">{{ theme.t.similarPosts }}</h2>
    <ul>
      <li v-for="item in items">
        <PreviewListItem :item="item" />
      </li>
    </ul>
  </div>
</template>
