<template>
  <div class="nav-search-button" @click="openSearchModal">
    <div class="search-input-wrapper">
      <svg
        class="search-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <span class="search-placeholder">Search...</span>
      <kbd class="search-shortcut">⌘K</kbd>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'

const { theme } = useData()

// Функция для открытия модального окна поиска
const openSearchModal = () => {
  // Здесь будет логика открытия модального окна поиска
  // Пока что просто выводим в консоль
  console.log('Opening search modal...')

  // В будущем здесь можно будет интегрировать с реальным поиском
  // Например, открыть модальное окно или переключить состояние поиска
}
</script>

<style scoped>
.nav-search-button {
  cursor: pointer;
  user-select: none;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
  min-width: 200px;
}

.search-input-wrapper:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg);
}

.search-icon {
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.search-placeholder {
  color: var(--vp-c-text-2);
  font-size: 14px;
  flex: 1;
}

.search-shortcut {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  min-width: 20px;
  height: 20px;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .search-input-wrapper {
    min-width: 150px;
  }

  .search-shortcut {
    display: none;
  }
}

/* Темная тема */
.dark .search-input-wrapper {
  background-color: var(--vp-c-bg-soft);
}

.dark .search-input-wrapper:hover {
  background-color: var(--vp-c-bg);
}

.dark .search-shortcut {
  background-color: var(--vp-c-bg-soft);
}
</style>
