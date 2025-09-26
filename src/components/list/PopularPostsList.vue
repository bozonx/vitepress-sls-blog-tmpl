<script setup>
import { useData } from 'vitepress'
import PreviewListItem from './PreviewListItem.vue'
import BtnLink from '../BtnLink.vue'
import UtilPageHeader from '../UtilPageHeader.vue'

const props = defineProps(['popularPosts'])
const { theme } = useData()

const posts = [...(props.popularPosts || [])]
  // TODO: sort by theme.popularPosts.sortBy
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, theme.value.perPage)
</script>

<template>
  <div v-if="posts.length" class="popular-posts">
    <UtilPageHeader class="popular-posts-header">
      {{ theme.t.popularPosts }}
    </UtilPageHeader>

    <ul>
      <li v-for="item in posts" :key="item.url">
        <PreviewListItem :item="item" />
      </li>
    </ul>

    <div class="mt-12 flex">
      <span class="mr-2">... </span>
      <BtnLink
        :href="`${theme.recentBaseUrl}/1`"
        :text="theme.t.allPostsCall"
        class="more-posts-btn hover-animation-rise"
      />
    </div>
  </div>
</template>

<style scoped>
/* Эффект матового стекла для популярных постов */
.popular-posts {
  position: relative;
}

.popular-posts .preview {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  /* Основные свойства матового стекла */
  backdrop-filter: blur(3px);
  /* Дополнительные эффекты */
  border-radius: 10px;
  transition: all 0.3s ease;
}

/* Эффекты при наведении */
.popular-posts .preview:hover {
  background: rgba(0, 0, 0, 0.45);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(15px);
}

/* Анимация появления */
.popular-posts .preview {
  animation: glassmorphism-fade-in 0.6s ease-out;
}

@keyframes glassmorphism-fade-in {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(10px);
  }
}

/* Улучшенная читаемость текста */
.popular-posts-header {
  text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.8);
}

.popular-posts .preview h2 {
  text-shadow: 0 3px 2px rgba(0, 0, 0, 0.3);
}

/* Стилизация статистики аналитики */
.popular-posts .text-xs {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 4px 8px;
}

.more-posts-btn {
  color: var(--gray-300);
  text-decoration: underline;
}
</style>
