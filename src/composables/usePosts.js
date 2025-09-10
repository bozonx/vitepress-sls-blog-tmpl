import { ref } from 'vue'

export function usePosts() {
  const posts = ref([])

  const savePosts = (postsData) => {
    posts.value = postsData
  }

  return { posts, savePosts }
}
