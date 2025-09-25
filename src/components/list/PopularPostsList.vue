<script setup>
import { useData } from 'vitepress'
import { ref, onMounted, computed } from 'vue'
import PreviewListItem from './PreviewListItem.vue'
// Импорты для build-time аналитики не нужны - данные загружаются из статического JSON

const props = defineProps(['allPosts'])
const { frontmatter, theme } = useData()

// Реактивные данные
const popularPostsData = ref(null)
const isLoading = ref(false)
const error = ref(null)

// Вычисляемое свойство для популярных постов
const popularPosts = computed(() => {
  if (!popularPostsData.value) {
    // Fallback: используем обычную сортировку по дате
    const sortedByDate = [...(props.allPosts || [])].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
    return sortedByDate.slice(0, theme.value.popularPostsCount)
  }

  return popularPostsData.value.posts || []
})

// Загружаем статические данные популярных постов
onMounted(async () => {
  const analyticsConfig = theme.value.analytics

  if (!analyticsConfig?.enabled) {
    console.log('📊 Аналитика отключена, используется fallback сортировка')
    return
  }

  isLoading.value = true
  error.value = null

  try {
    // Загружаем статический JSON файл
    const response = await fetch('/popular-posts.json')

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    popularPostsData.value = data

    console.log(
      `📊 Загружены популярные посты из ${data.source} (${data.popularPostsCount} постов)`
    )
  } catch (err) {
    console.warn('⚠️ Не удалось загрузить популярные посты:', err.message)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

// Функция для получения метки типа аналитики
function getAnalyticsTypeLabel(type) {
  const labels = { google: 'GA Stats', mock: 'Mock Data' }
  return labels[type] || 'Analytics'
}
</script>

<template>
  <div v-if="popularPosts.length" class="popular-posts">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold">{{ theme.t.popularPosts }}</h2>

      <!-- Индикатор загрузки статистики -->
      <div v-if="isLoading" class="flex items-center text-sm text-gray-500">
        <svg
          class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading popular posts...
      </div>

      <!-- Индикатор использования аналитики -->
      <div
        v-else-if="popularPostsData && theme.analytics?.enabled"
        class="text-xs text-green-600 bg-green-50 px-2 py-1 rounded"
      >
        📊 {{ getAnalyticsTypeLabel(popularPostsData.source) }}
      </div>
    </div>

    <!-- Сообщение об ошибке -->
    <div
      v-if="error"
      class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm"
    >
      <strong>Ошибка загрузки статистики:</strong> {{ error }}
      <br />
      <span class="text-gray-600">Используется сортировка по дате</span>
    </div>

    <ul>
      <li v-for="item in popularPosts" :key="item.url">
        <PreviewListItem :item="item" />

        <!-- Показываем статистику аналитики если доступна -->
        <div
          v-if="item.analytics && theme.analytics?.enabled"
          class="ml-4 mt-1 text-xs text-gray-500"
        >
          <span v-if="theme.analytics.sortBy === 'pageviews'">
            👁️ {{ item.analytics.pageviews.toLocaleString() }} views
          </span>
          <span v-else-if="theme.analytics.sortBy === 'uniquePageviews'">
            👤 {{ item.analytics.uniquePageviews.toLocaleString() }} unique
            views
          </span>
          <span v-else-if="theme.analytics.sortBy === 'avgTimeOnPage'">
            ⏱️ {{ Math.floor(item.analytics.avgTimeOnPage / 60) }}m
            {{ item.analytics.avgTimeOnPage % 60 }}s avg
          </span>
          <span v-else-if="theme.analytics.sortBy === 'bounceRate'">
            📈 {{ (item.analytics.bounceRate * 100).toFixed(1) }}% bounce rate
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Эффект матового стекла для популярных постов */
.popular-posts {
  position: relative;
}

.popular-posts .preview {
  /* Основные свойства матового стекла */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(10px);

  /* Границы и тени */
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  /* Дополнительные эффекты */
  border-radius: 16px;
  transition: all 0.3s ease;
}

/* Темная тема */
.dark .popular-posts .preview {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Эффекты при наведении */
.popular-posts .preview:hover {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  /* transform: translateY(-2px); */
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.dark .popular-posts .preview:hover {
  background: rgba(0, 0, 0, 0.4);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* Анимация появления */
.popular-posts .preview {
  animation: glassmorphism-fade-in 0.6s ease-out;
}

@keyframes glassmorphism-fade-in {
  from {
    opacity: 0;
    /* transform: translateY(20px); */
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    /* transform: translateY(0); */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

/* Улучшенная читаемость текста */
.popular-posts .preview h2 {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.dark .popular-posts .preview h2 {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Стилизация статистики аналитики */
.popular-posts .text-xs {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 4px 8px;
}

.dark .popular-posts .text-xs {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
