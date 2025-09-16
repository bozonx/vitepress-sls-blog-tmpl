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
  // Если не правильно опрелилось имя то укажите его здесь самостоятельно
  filename: { type: String, default: '' },
  // CSS классы
  class: { type: String, default: '' },
  // Отключить кнопку
  disabled: { type: Boolean, default: false },
})

// Состояние отключения кнопки
const isDisabled = ref(props.disabled)

// Вычисляемое имя файла для скачивания (используется в download атрибуте)
const downloadFilename = computed(() => {
  if (props.filename) {
    return props.filename
  }

  // Извлекаем полное имя файла с расширением из URL
  return props.url.split('/').pop() || 'file'
})

const extensionName = computed(() => {
  const filename = downloadFilename.value
  const extension = filename.split('.').pop()

  // Если расширение есть и оно не равно самому имени файла (т.е. есть точка)
  if (extension && extension !== filename) {
    return extension.toLowerCase()
  }

  return undefined
})

const downloadFile = async () => {
  if (isDisabled.value) return

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
  } catch (error) {
    console.error('Error downloading file:', error)
    // В случае ошибки открываем файл в новой вкладке
    window.open(props.url, '_blank')
  }
}

// Получаем иконку для типа файла
const getFileTypeIcon = (extension) => {
  // Если расширение не определено, возвращаем иконку по умолчанию
  if (!extension) {
    return 'mdi:file'
  }

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
    <div class="file-info" :class="{ 'has-hint': $slots.default }">
      <div class="file-icon">
        <Icon :icon="fileIcon" />
      </div>
      <div class="file-details">
        <div class="file-name muted">
          {{ downloadFilename }}
        </div>
        <div v-if="$slots.default" class="file-hint">
          <slot />
        </div>
      </div>
    </div>

    <Btn
      icon="mdi:download"
      :disabled="isDisabled"
      :text="theme.t.downloadFile"
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
  padding-left: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--bg-color);
  transition: all 0.2s ease;
  gap: 1rem;
  border-left: 3px solid var(--primary-color);
}

.dark .file-download {
  background: var(--bg-dark-color);
  border-color: var(--border-dark-color);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.file-info.has-hint {
  align-items: flex-start;
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
  word-break: break-all;
  margin-bottom: 0.25rem;
}

.file-hint {
  font-size: 0.875rem;
  color: var(--gray-600);
  font-style: italic;
  margin-top: 0.25rem;
}

.dark .file-hint {
  color: var(--gray-400);
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
