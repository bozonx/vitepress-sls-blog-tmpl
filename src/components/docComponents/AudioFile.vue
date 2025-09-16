<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import { Icon } from '@iconify/vue'
import Btn from '../Btn.vue'
import { useData } from 'vitepress'

const { theme } = useData()
const hostname = inject('hostname')

// Пропсы компонента
const props = defineProps({
  // URL аудио файла
  url: { type: String, required: true },
  // Если не правильно определилось имя то укажите его здесь самостоятельно
  filename: { type: String, default: '' },
  // CSS классы
  class: { type: String, default: '' },
  // Отключить кнопки
  disabled: { type: Boolean, default: false },
})

// Состояние отключения кнопок
const isDisabled = ref(props.disabled)

// Состояние аудио плеера
const audioRef = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const isLoading = ref(false)
const hasError = ref(false)
const isPlayerVisible = ref(false)

// Обработка URL - добавление hostname для локальных путей
const processedUrl = computed(() => {
  // Если URL начинается с /, добавляем hostname
  if (props.url.startsWith('/') && hostname) {
    return `${hostname}${props.url}`
  }
  return props.url
})

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

// Методы управления аудио плеером
const togglePlayPause = async () => {
  if (isDisabled.value || hasError.value) return

  try {
    if (!audioRef.value) return

    // Если плеер не виден, показываем его и начинаем воспроизведение
    if (!isPlayerVisible.value) {
      isPlayerVisible.value = true
      // Небольшая задержка для анимации появления плеера
      setTimeout(async () => {
        if (audioRef.value) {
          await audioRef.value.play()
        }
      }, 100)
      return
    }

    // Если плеер виден, переключаем воспроизведение/паузу
    if (isPlaying.value) {
      audioRef.value.pause()
    } else {
      await audioRef.value.play()
    }
  } catch (error) {
    console.error('Error playing audio:', error)
    hasError.value = true
  }
}

const stopAudio = () => {
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value.currentTime = 0
    isPlaying.value = false
  }
}

// Метод для скрытия плеера
const hidePlayer = () => {
  isPlayerVisible.value = false
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value.currentTime = 0
    isPlaying.value = false
  }
}

const seekTo = (time) => {
  if (audioRef.value && !isDisabled.value) {
    audioRef.value.currentTime = time
  }
}

const setVolume = (newVolume) => {
  if (audioRef.value) {
    const volumeValue = parseFloat(newVolume)
    audioRef.value.volume = volumeValue
    volume.value = volumeValue
    console.log('Volume set to:', volumeValue)
  }
}

// Обработка клика по прогресс-бару
const handleProgressClick = (event) => {
  if (isDisabled.value || !duration.value) return

  const progressBar = event.currentTarget
  const rect = progressBar.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width
  const newTime = percentage * duration.value

  seekTo(newTime)
}

// Обработчики событий аудио
const handleLoadedMetadata = () => {
  if (audioRef.value) {
    duration.value = audioRef.value.duration
    isLoading.value = false
    // Устанавливаем громкость после загрузки метаданных
    audioRef.value.volume = volume.value
    console.log(
      'Audio metadata loaded, duration:',
      duration.value,
      'volume:',
      volume.value
    )
  }
}

const handleTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
    console.log('Time update:', currentTime.value, '/', duration.value)
  }
}

const handlePlay = () => {
  isPlaying.value = true
}

const handlePause = () => {
  isPlaying.value = false
}

const handleEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
}

const handleLoadStart = () => {
  isLoading.value = true
  hasError.value = false
}

const handleError = () => {
  hasError.value = true
  isLoading.value = false
  isPlaying.value = false
}

// Форматирование времени
const formatTime = (time) => {
  if (!time || !isFinite(time)) return '0:00'

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// Форматирование процентов для прогресс-бара
const progressPercent = computed(() => {
  if (!duration.value || !isFinite(duration.value)) {
    console.log('Progress: no duration or invalid duration')
    return 0
  }
  const percent = (currentTime.value / duration.value) * 100
  console.log(
    'Progress percent:',
    percent,
    'currentTime:',
    currentTime.value,
    'duration:',
    duration.value
  )
  return percent
})

const downloadFile = async () => {
  if (isDisabled.value) return

  try {
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a')
    link.href = processedUrl.value
    link.download = downloadFilename.value
    link.target = '_blank'

    // Добавляем ссылку в DOM, кликаем и удаляем
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading file:', error)
    // В случае ошибки открываем файл в новой вкладке
    window.open(processedUrl.value, '_blank')
  }
}

// Инициализация при монтировании компонента
onMounted(() => {
  if (audioRef.value) {
    // Устанавливаем обработчики событий
    audioRef.value.addEventListener('loadedmetadata', handleLoadedMetadata)
    audioRef.value.addEventListener('timeupdate', handleTimeUpdate)
    audioRef.value.addEventListener('play', handlePlay)
    audioRef.value.addEventListener('pause', handlePause)
    audioRef.value.addEventListener('ended', handleEnded)
    audioRef.value.addEventListener('loadstart', handleLoadStart)
    audioRef.value.addEventListener('error', handleError)

    // Устанавливаем громкость
    audioRef.value.volume = volume.value
  }
})

// Очистка при размонтировании
onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.removeEventListener('loadedmetadata', handleLoadedMetadata)
    audioRef.value.removeEventListener('timeupdate', handleTimeUpdate)
    audioRef.value.removeEventListener('play', handlePlay)
    audioRef.value.removeEventListener('pause', handlePause)
    audioRef.value.removeEventListener('ended', handleEnded)
    audioRef.value.removeEventListener('loadstart', handleLoadStart)
    audioRef.value.removeEventListener('error', handleError)
  }
})

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
    ogg: 'mdi:file-music',
    flac: 'mdi:file-music',
    aac: 'mdi:file-music',
    m4a: 'mdi:file-music',
    wma: 'mdi:file-music',
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
  <div class="audio-file" :class="class">
    <!-- Скрытый audio элемент -->
    <audio
      ref="audioRef"
      :src="processedUrl"
      preload="metadata"
      @loadedmetadata="handleLoadedMetadata"
      @timeupdate="handleTimeUpdate"
      @play="handlePlay"
      @pause="handlePause"
      @ended="handleEnded"
      @loadstart="handleLoadStart"
      @error="handleError"
    />

    <!-- Первая строка: кнопка play, название файла, кнопка скачать -->
    <div class="file-header">
      <!-- Кнопка воспроизведения -->
      <button
        class="play-btn-header"
        :disabled="isDisabled || hasError"
        @click="togglePlayPause"
        :title="isPlaying ? 'Pause' : 'Play'"
      >
        <Icon
          :icon="
            isLoading ? 'mdi:loading' : isPlaying ? 'mdi:pause' : 'mdi:play'
          "
          :class="{ spinning: isLoading }"
        />
      </button>

      <!-- Информация о файле -->
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

      <!-- Кнопка скачивания -->
      <Btn
        icon="mdi:download"
        :disabled="isDisabled"
        :text="theme.t.downloadFile"
        class="download-btn-header"
        @click="downloadFile"
      />
    </div>

    <!-- Аудио плеер (показывается при нажатии на play) -->
    <div v-if="isPlayerVisible" class="audio-player">
      <!-- Основные контролы -->
      <div class="player-controls">
        <!-- Кнопка воспроизведения/паузы -->
        <button
          class="play-btn"
          :disabled="isDisabled || hasError"
          @click="togglePlayPause"
          :title="isPlaying ? 'Pause' : 'Play'"
        >
          <Icon
            :icon="
              isLoading ? 'mdi:loading' : isPlaying ? 'mdi:pause' : 'mdi:play'
            "
            :class="{ spinning: isLoading }"
          />
        </button>

        <!-- Кнопка остановки -->
        <button
          class="stop-btn"
          :disabled="isDisabled || hasError || !isPlaying"
          @click="stopAudio"
          title="Stop"
        >
          <Icon icon="mdi:stop" />
        </button>

        <!-- Кнопка скрытия плеера -->
        <button class="hide-btn" @click="hidePlayer" title="Hide player">
          <Icon icon="mdi:chevron-up" />
        </button>

        <!-- Время -->
        <div class="time-display">
          <span class="current-time">{{ formatTime(currentTime) }}</span>
          <span class="time-separator">/</span>
          <span class="total-time">{{ formatTime(duration) }}</span>
        </div>

        <!-- Отладочная информация -->
        <div class="debug-info" style="font-size: 0.75rem; color: #666">
          Progress: {{ progressPercent.toFixed(1) }}% | Volume: {{ volume }}
        </div>
      </div>

      <!-- Прогресс-бар -->
      <div class="progress-container">
        <div class="progress-bar" @click="handleProgressClick">
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: `${progressPercent}%` }"
            ></div>
          </div>
        </div>
        <!-- Отладочная информация для прогресса -->
        <div style="font-size: 0.75rem; color: #999; margin-top: 0.25rem">
          Progress: {{ progressPercent.toFixed(1) }}% ({{
            currentTime.toFixed(1)
          }}s / {{ duration.toFixed(1) }}s)
          <br>
          Progress fill width: {{ progressPercent }}%
        </div>
      </div>

      <!-- Контрол громкости -->
      <div class="volume-control">
        <Icon icon="mdi:volume-high" class="volume-icon" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          v-model="volume"
          @input="setVolume($event.target.value)"
          class="volume-slider"
          :disabled="isDisabled"
        />
        <!-- Отладочная информация для громкости -->
        <span style="font-size: 0.75rem; color: #999; margin-left: 0.5rem">
          {{ (volume * 100).toFixed(0) }}%
        </span>
      </div>
    </div>

    <!-- Сообщение об ошибке -->
    <div v-if="hasError" class="error-message">
      <Icon icon="mdi:alert-circle" />
      <span>Error loading audio file</span>
    </div>
  </div>
</template>

<style scoped>
.audio-file {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-left: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--bg-color);
  transition: all 0.2s ease;
  gap: 1rem;
  border-left: 3px solid var(--primary-color);
}

.dark .audio-file {
  background: var(--bg-dark-color);
  border-color: var(--border-dark-color);
}

/* Заголовок файла - первая строка */
.file-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.play-btn-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.play-btn-header:hover:not(:disabled) {
  background: var(--primary-color-dark, #2563eb);
  transform: scale(1.05);
}

.play-btn-header:disabled {
  background: var(--gray-400);
  cursor: not-allowed;
  transform: none;
}

.dark .play-btn-header:disabled {
  background: var(--gray-600);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  flex: 1;
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

.download-btn-header {
  flex-shrink: 0;
}

/* Аудио плеер */
.audio-player {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--gray-50);
  border-radius: 0.375rem;
  border: 1px solid var(--border-color);
}

.dark .audio-player {
  background: var(--gray-900);
  border-color: var(--border-dark-color);
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.play-btn,
.stop-btn,
.hide-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.play-btn:hover:not(:disabled),
.stop-btn:hover:not(:disabled),
.hide-btn:hover:not(:disabled) {
  background: var(--primary-color-dark, #2563eb);
  transform: scale(1.05);
}

.play-btn:disabled,
.stop-btn:disabled {
  background: var(--gray-400);
  cursor: not-allowed;
  transform: none;
}

.dark .play-btn:disabled,
.dark .stop-btn:disabled {
  background: var(--gray-600);
}

.hide-btn {
  background: var(--gray-500);
}

.hide-btn:hover {
  background: var(--gray-600);
}

.dark .hide-btn {
  background: var(--gray-600);
}

.dark .hide-btn:hover {
  background: var(--gray-500);
}

.time-display {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--gray-600);
  font-family: monospace;
  min-width: 0;
}

.dark .time-display {
  color: var(--gray-400);
}

.time-separator {
  color: var(--gray-400);
}

.dark .time-separator {
  color: var(--gray-500);
}

/* Прогресс-бар */
.progress-container {
  flex: 1;
  min-width: 0;
}

.progress-bar {
  cursor: pointer;
  padding: 0.5rem 0;
}

.progress-track {
  width: 100%;
  height: 0.375rem;
  background: var(--gray-200, #e5e7eb);
  border-radius: 0.1875rem;
  overflow: hidden;
  position: relative;
  /* Временная отладка */
  border: 1px solid blue;
}

.dark .progress-track {
  background: var(--gray-700, #374151);
}

.progress-fill {
  height: 100%;
  background: var(--primary-color, #3b82f6);
  border-radius: 0.1875rem;
  transition: width 0.1s ease;
  min-width: 0;
  /* Временная отладка */
  border: 1px solid red;
}

/* Контрол громкости */
.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.volume-icon {
  color: var(--gray-600);
  flex-shrink: 0;
}

.dark .volume-icon {
  color: var(--gray-400);
}

.volume-slider {
  flex: 1;
  min-width: 0;
  height: 0.25rem;
  background: var(--gray-200, #e5e7eb);
  border-radius: 0.125rem;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  /* Временная отладка */
  border: 1px solid green;
}

.dark .volume-slider {
  background: var(--gray-700, #374151);
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  background: var(--primary-color, #3b82f6);
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  background: var(--primary-color, #3b82f6);
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.volume-slider:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Сообщение об ошибке */
.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--red-50);
  border: 1px solid var(--red-200);
  border-radius: 0.375rem;
  color: var(--red-700);
  font-size: 0.875rem;
}

.dark .error-message {
  background: var(--red-900);
  border-color: var(--red-700);
  color: var(--red-300);
}

/* Анимация загрузки */
.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Адаптивность для мобильных устройств */
@media (max-width: 640px) {
  .audio-file {
    padding: 0.75rem;
    padding-left: 1.5rem;
  }

  .file-header {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .file-info {
    order: 2;
    width: 100%;
    margin-top: 0.5rem;
  }

  .download-btn-header {
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .player-controls {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .time-display {
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .volume-control {
    order: 4;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .audio-player {
    padding: 0.5rem;
  }

  .play-btn,
  .stop-btn,
  .hide-btn,
  .play-btn-header {
    width: 2rem;
    height: 2rem;
  }
}
</style>
