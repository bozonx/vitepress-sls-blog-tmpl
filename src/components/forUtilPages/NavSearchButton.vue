<template>
  <div class="nav-search-button">
    <div class="search-input-wrapper">
      <Icon icon="fa6-solid:magnifying-glass" class="search-icon" />
      <span class="search-placeholder">{{ theme.t.search }}...</span>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useData } from 'vitepress'

const { theme } = useData()
</script>

<style scoped>
.nav-search-button {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  height: 100%;
  width: 160px;
}

.search-input-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
}

.search-input-wrapper:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg);
}

.search-icon {
  width: 16px;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.search-placeholder {
  color: var(--vp-c-text-2);
  font-size: 14px;
  flex: 1;
}

@media (max-width: 490px) {
  .nav-search-button {
    width: 120px;
  }
}

@media (max-width: 439px) {
  .nav-search-button {
    width: 100%;
  }

  .search-input-wrapper {
    padding: 8px 10px;
  }

  .search-placeholder {
    display: none;
  }
}
</style>
