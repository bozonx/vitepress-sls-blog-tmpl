<template>
  <div class="social-media-links">
    <a
      v-for="link in links"
      :key="link.url"
      :href="link.url"
      :title="link.title"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link"
    >
      <Icon :icon="getIconName(link.type)" class="social-icon" />
    </a>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps(['links'])

// Функция для получения правильного имени иконки в зависимости от типа
const getIconName = (type) => {
  const iconMap = {
    site: 'mdi:web',
    youtube: 'mdi:youtube',
    x: 'mdi:twitter', // X (бывший Twitter)
    facebook: 'mdi:facebook',
    instagram: 'mdi:instagram',
    tiktok: 'mdi:tiktok',
  }

  return iconMap[type] || iconMap.site // fallback на site если тип не распознан
}
</script>

<style scoped>
.social-media-links {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.social-link:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
  transform: translateY(-1px);
}

.social-icon {
  width: 2.25rem;
  height: 2.25rem;
}
</style>
