<template>
  <div @click="showSearchModal">
    <slot />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { GLOBAL_MODALS_CONTAINER_ID } from '../../constants.js'

const MODAL_ID = 'search-modal'
const CLOSE_BUTTON_CLASS = 'search-modal-close-button'
const pageFind = ref(null)

const isSearchModalShown = () => {
  const searchModal = document.getElementById(MODAL_ID)
  return searchModal && searchModal.style.display === 'flex'
}

const showSearchModal = () => {
  const searchModal = document.getElementById(MODAL_ID)

  if (searchModal) {
    searchModal.style.display = 'flex'

    if (window.PagefindUI) {
      pageFind.value = new window.PagefindUI({
        element: '#pagefind-search',
        showSubResults: true,
        showImages: true,
      })
    }

    setTimeout(() => {
      const searchInput = searchModal.querySelector(
        '.pagefind-ui__search-input'
      )
      searchInput.focus()
    }, 100)
  } else {
    console.warn('Search modal not found')
  }
}

const hideSearchModal = () => {
  const searchModal = document.getElementById(MODAL_ID)

  if (searchModal) {
    searchModal.style.display = 'none'
  }

  if (pageFind.value) {
    pageFind.value.destroy()
  }
}

const createSearchModal = () => {
  if (document.getElementById(MODAL_ID)) return

  const searchModal = document.createElement('div')
  searchModal.id = MODAL_ID
  searchModal.className = 'search-modal'

  // Добавляем содержимое модального окна
  searchModal.innerHTML = `
  <div class="search-modal-content">
    <div id="pagefind-search"></div>

    <button class="${CLOSE_BUTTON_CLASS}">×</button>
  </div>
  `

  searchModal.addEventListener('click', (e) => {
    if (
      e.target === searchModal ||
      e.target.classList.contains(CLOSE_BUTTON_CLASS) ||
      e.target.classList.contains('pagefind-ui__result-link')
    ) {
      hideSearchModal()
    }
  })

  document.getElementById(GLOBAL_MODALS_CONTAINER_ID).appendChild(searchModal)
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    if (isSearchModalShown()) hideSearchModal()
  }
}

onMounted(() => {
  createSearchModal()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
