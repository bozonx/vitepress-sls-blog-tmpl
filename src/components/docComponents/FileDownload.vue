<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Btn from '../Btn.vue'
import { useData } from 'vitepress'

const { theme } = useData()

// Пропсы компонента
const props = defineProps({
  // URL файла для скачивания
  url: { type: String, required: true },
  // Имя файла (отображается пользователю)
  filename: { type: String, default: '' },
  // Текст кнопки
  buttonText: { type: String },
  // CSS классы
  class: { type: String, default: '' },
  // Отключить кнопку
  disabled: { type: Boolean, default: false },
})

// Состояние отключения кнопки
const isDisabled = ref(props.disabled || false)

// Вычисляемое имя файла для скачивания (используется в download атрибуте)
const downloadFilename = computed(() => {
  return props.filename || props.url.split('/').pop() || 'file'
})

const extensionName = computed(() => {
  return (downloadFilename.value.split('.').pop() || '').toLowerCase()
})

const buttonText = computed(() => {
  return props.buttonText || theme.value.t.downloadFile
})

// Функция для скачивания файла
const downloadFile = async () => {
  if (isDisabled.value) {
    return
  }

  try {
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a')
    link.href = props.url
    link.download = downloadFilename.value
    link.target = '_blank'

    // Добавляем ссылку в DOM, кликаем и удаляем
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Отключаем кнопку на 5 секунд
    isDisabled.value = true
    setTimeout(() => {
      isDisabled.value = false
    }, 5000)
  } catch (error) {
    console.error('Error downloading file:', error)
    // В случае ошибки открываем файл в новой вкладке
    window.open(props.url, '_blank')
  }
}

// Получаем иконку для типа файла
const getFileTypeIcon = (extension) => {
  const iconMap = {
    pdf: 'mdi:file-pdf-box',
    doc: 'mdi:file-word-box',
    docx: 'mdi:file-word-box',
    xls: 'mdi:file-excel-box',
    xlsx: 'mdi:file-excel-box',
    ppt: 'mdi:file-powerpoint-box',
    pptx: 'mdi:file-powerpoint-box',
    txt: 'mdi:file-document-outline',
    zip: 'mdi:file-zip-box',
    rar: 'mdi:file-zip-box',
    '7z': 'mdi:file-zip-box',
    jpg: 'mdi:file-image',
    jpeg: 'mdi:file-image',
    png: 'mdi:file-image',
    webp: 'mdi:file-image',
    avif: 'mdi:file-image',
    gif: 'mdi:file-image',
    svg: 'mdi:file-image',
    mp4: 'mdi:file-video',
    avi: 'mdi:file-video',
    mov: 'mdi:file-video',
    mp3: 'mdi:file-music',
    wav: 'mdi:file-music',
    json: 'mdi:code-json',
    js: 'mdi:language-javascript',
    ts: 'mdi:language-typescript',
    html: 'mdi:language-html5',
    css: 'mdi:language-css3',
    xml: 'mdi:file-xml-box',
  }

  return iconMap[extension] || 'mdi:file'
}

// Иконка для отображения
const fileIcon = computed(() => {
  return getFileTypeIcon(extensionName.value)
})
</script>

<template>
  <div class="file-download" :class="class">
    <!-- Информация о файле -->
    <div class="file-info">
      <div class="file-icon">
        <Icon :icon="fileIcon" />
      </div>
      <div class="file-details">
        <div class="file-name">
          <slot>{{ downloadFilename }}</slot>
        </div>
      </div>
    </div>

    <!-- Кнопка скачивания -->
    <Btn
      icon="mdi:download"
      :disabled="disabled || isDisabled"
      :text="buttonText"
      class="download-btn"
      @click="downloadFile"
    />
  </div>
</template>

<style scoped>
.file-download {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--bg-color);
  transition: all 0.2s ease;
  gap: 1rem;
}

.file-download:hover {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark .file-download {
  background: var(--bg-dark-color);
  border-color: var(--border-dark-color);
}

.dark .file-download:hover {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--gray-100);
  border-radius: 0.375rem;
  color: var(--gray-600);
  flex-shrink: 0;
}

.dark .file-icon {
  background: var(--gray-800);
  color: var(--gray-400);
}

.file-details {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-weight: 500;
  color: var(--text-color);
  word-break: break-all;
  margin-bottom: 0.25rem;
}

.dark .file-name {
  color: var(--text-dark-color);
}

.file-meta {
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--gray-600);
}

.dark .file-meta {
  color: var(--gray-400);
}

.file-type {
  text-transform: uppercase;
  font-weight: 500;
}

.file-size {
  font-weight: 400;
}

.download-btn {
  flex-shrink: 0;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 640px) {
  .file-download {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .file-info {
    justify-content: flex-start;
  }

  .download-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
