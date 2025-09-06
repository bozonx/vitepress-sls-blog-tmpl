import { ref, computed } from 'vue'

/**
 * Composable для реактивного управления постами в памяти Простое хранение
 * постов без localStorage
 */
export function usePosts() {
  // Реактивная ссылка на массив постов
  const posts = ref([])

  /**
   * Сохраняет посты в памяти
   *
   * @param {Array} postsData - Массив постов для сохранения
   */
  const savePosts = (postsData) => {
    posts.value = postsData
  }

  /** Очищает посты из памяти */
  const clearPosts = () => {
    posts.value = []
  }

  return { posts: computed(() => posts.value), savePosts, clearPosts }
}
