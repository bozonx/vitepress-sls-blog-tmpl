<template>
  <div class="flex gap-x-2">
    <Btn
      v-for="link in links"
      :key="link.url"
      :href="link.url"
      :title="link.title"
      :icon="getIconName(link.type)"
      iconClass="text-2xl"
      target="_blank"
      class="social-link hover-animation-rise"
    />
  </div>
</template>

<script setup>
import Btn from './Btn.vue'

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
    vk: 'mdi:vk',
    mastodon: 'mdi:mastodon',
    diaspora: 'mdi:diaspora',
    // bastyon, odysee, threads - иконки недоступны в @iconify/vue, используем fallback
  }

  return iconMap[type] || iconMap.site // fallback на site если тип не распознан
}
</script>
