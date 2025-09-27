<script setup>
import { inject } from 'vue'
import { useData } from 'vitepress'
import PopularPostsList from '../list/PopularPostsList.vue'
import UtilPageHeader from '../UtilPageHeader.vue'
import BtnLink from '../BtnLink.vue'

const { localeIndex, theme } = useData()
const allPosts = inject('posts')
</script>

<template>
  <div v-if="theme.popularPosts?.enabled" class="home-popular-posts">
    <UtilPageHeader class="home-popular-posts-header">
      {{ theme.t.popularPosts }}
    </UtilPageHeader>

    <PopularPostsList :curPage="1" :allPosts="allPosts[localeIndex]" />

    <div class="mt-12 flex">
      <span class="mr-2">... </span>
      <BtnLink
        :href="`${theme.popularBaseUrl}/2`"
        :text="theme.t.allPostsCall"
        class="more-posts-btn hover-animation-rise"
      />
    </div>
  </div>
</template>

<style scoped>
/* Эффект матового стекла для популярных постов */
.home-popular-posts {
  position: relative;
}

.home-popular-posts .preview {
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
.home-popular-posts .preview:hover {
  background: rgba(0, 0, 0, 0.45);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(15px);
}

/* Анимация появления */
.home-popular-posts .preview {
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
.home-popular-posts-header {
  text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.8);
}

.home-popular-posts .preview h2 {
  text-shadow: 0 3px 2px rgba(0, 0, 0, 0.3);
}

/* Стилизация статистики аналитики */
.home-popular-posts .text-xs {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 4px 8px;
}

.home-popular-posts .more-posts-btn {
  color: var(--gray-300);
  text-decoration: underline;
}
</style>
