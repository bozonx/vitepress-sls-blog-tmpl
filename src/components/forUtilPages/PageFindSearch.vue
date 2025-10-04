<template>
  <div @click="handleSlotClick">
    <slot />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

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
    console.log('Search modal shown')

    if (window.PagefindUI) {
      pageFind.value = new window.PagefindUI({
        element: '#pagefind-search',
        showSubResults: true,
        showImages: true,
      })
    }
  } else {
    console.warn('Search modal not found')
  }
}

// Функция для скрытия модального окна
const hideSearchModal = () => {
  const searchModal = document.getElementById(MODAL_ID)
  if (searchModal) {
    searchModal.style.display = 'none'
  }
}

// Обработчик клика на слот
const handleSlotClick = (event) => {
  // Показываем модальное окно поиска
  showSearchModal()

  // Дополнительная логика обработки клика
  console.log('Slot clicked:', event.target)
}

const createSearchModal = () => {
  if (document.getElementById(MODAL_ID)) return

  const modalsContainer = document.getElementById('modals')
  const searchModal = document.createElement('div')
  searchModal.id = MODAL_ID
  searchModal.className = 'search-modal'

  // Добавляем содержимое модального окна
  searchModal.innerHTML = `
  <div class="search-modal-content">
    <div id="pagefind-search"></div>

    <button onclick="window.hideSearchModal()" class="${CLOSE_BUTTON_CLASS}">×</button>
  </div>
  `

  // Добавляем обработчик клика на фон для закрытия модального окна
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      hideSearchModal()
    }
  })

  // Делаем функцию hideSearchModal доступной глобально для кнопки закрытия
  window.hideSearchModal = hideSearchModal

  // Добавляем модальное окно в контейнер
  modalsContainer.appendChild(searchModal)
  console.log('Created search-modal element')
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
