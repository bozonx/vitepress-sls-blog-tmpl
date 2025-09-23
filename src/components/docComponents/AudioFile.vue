<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import { Icon } from '@iconify/vue'
import Btn from '../Btn.vue'
import { useData } from 'vitepress'

const { theme } = useData()

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

// Вычисляемое имя файла для скачивания (используется в download атрибуте)
const downloadFilename = computed(() => {
  if (props.filename) {
    return props.filename
  }

  // Извлекаем полное имя файла с расширением из URL
  return props.url.split('/').pop() || 'audio file'
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

// Состояние аудио плеера
const audioRef = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const isLoading = ref(false)
const hasError = ref(false)
const isPlayerVisible = ref(false)

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
  }
}

const handleTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
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
    return 0
  }
  return (currentTime.value / duration.value) * 100
})

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
</script>

<template>
  <div class="audio-file" :class="class">
    <!-- Скрытый audio элемент -->
    <audio
      ref="audioRef"
      :src="props.url"
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
        v-if="!isPlayerVisible"
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
      </div>

      <!-- Прогресс-бар -->
      <div class="progress-container">
        <div class="progress-bar" @click="handleProgressClick">
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: `${Math.max(progressPercent, 0.1)}%` }"
            ></div>
          </div>
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
  border: 1px solid var(--gray-150);
  border-radius: 0.75rem;
  background: #ffffff;
  transition: all 0.2s ease;
  gap: 1rem;
  border-left: 4px solid var(--primary-btn-bg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark .audio-file {
  background: var(--gray-800);
  border-color: var(--gray-700);
  border-left-color: var(--primary-btn-bg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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
  background: var(--primary-btn-bg);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.play-btn-header:hover:not(:disabled) {
  transform: scale(1.05);
  filter: brightness(115%);
}

.play-btn-header:disabled {
  background: var(--gray-400, #9ca3af);
  cursor: not-allowed;
  transform: none;
}

.dark .play-btn-header:disabled {
  background: var(--gray-600, #4b5563);
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
  padding: 1rem;
  background: var(--gray-50, #f9fafb);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color, #e5e7eb);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease-out;
}

.dark .audio-player {
  background: var(--gray-900, #111827);
  border-color: var(--border-dark-color, #374151);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  background: var(--primary-color, #3b82f6);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.play-btn:hover:not(:disabled),
.stop-btn:hover:not(:disabled),
.hide-btn:hover:not(:disabled) {
  background: var(--primary-color-dark, #2563eb);
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
}

.play-btn:disabled,
.stop-btn:disabled {
  background: var(--gray-400, #9ca3af);
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.dark .play-btn:disabled,
.dark .stop-btn:disabled {
  background: var(--gray-600, #4b5563);
}

.hide-btn {
  background: var(--gray-500, #6b7280);
  box-shadow: 0 2px 4px rgba(107, 114, 128, 0.3);
}

.hide-btn:hover {
  background: var(--gray-600, #4b5563);
  box-shadow: 0 4px 8px rgba(107, 114, 128, 0.4);
}

.dark .hide-btn {
  background: var(--gray-600, #4b5563);
}

.dark .hide-btn:hover {
  background: var(--gray-500, #6b7280);
}

.time-display {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--gray-600, #4b5563);
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  min-width: 0;
  font-weight: 500;
  background: var(--gray-100, #f3f4f6);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--gray-200, #e5e7eb);
}

.dark .time-display {
  color: var(--gray-400, #9ca3af);
  background: var(--gray-800, #1f2937);
  border-color: var(--gray-700, #374151);
}

.time-separator {
  color: var(--gray-400, #9ca3af);
  font-weight: 400;
}

.dark .time-separator {
  color: var(--gray-500, #6b7280);
}

/* Прогресс-бар */
.progress-container {
  flex: 1;
  min-width: 0;
}

.progress-bar {
  cursor: pointer;
  padding: 0.75rem 0;
}

.progress-track {
  width: 100%;
  height: 0.5rem;
  background: var(--gray-200, #e5e7eb);
  border-radius: 0.25rem;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.dark .progress-track {
  background: var(--gray-700, #374151);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--primary-color, #3b82f6),
    var(--primary-color-light, #60a5fa)
  );
  border-radius: 0.25rem;
  transition: width 0.2s ease;
  min-width: 0;
  position: relative;
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.3);
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  border-radius: 0.25rem;
}

/* Контрол громкости */
.volume-control {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  padding: 0.5rem 0;
}

.volume-icon {
  color: var(--gray-600);
  flex-shrink: 0;
  font-size: 1.25rem;
}

.dark .volume-icon {
  color: var(--gray-400);
}

.volume-slider {
  flex: 1;
  min-width: 0;
  height: 0.375rem;
  background: var(--gray-200, #e5e7eb);
  border-radius: 0.1875rem;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.dark .volume-slider {
  background: var(--gray-700, #374151);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
}

.volume-slider:hover {
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.15),
    0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark .volume-slider:hover {
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.4),
    0 0 0 3px rgba(59, 130, 246, 0.2);
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  background: linear-gradient(
    135deg,
    var(--primary-color, #3b82f6),
    var(--primary-color-light, #60a5fa)
  );
  border-radius: 50%;
  cursor: pointer;
  box-shadow:
    0 2px 4px rgba(59, 130, 246, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  border: 2px solid white;
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow:
    0 4px 8px rgba(59, 130, 246, 0.4),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.dark .volume-slider::-webkit-slider-thumb {
  border: 2px solid var(--gray-800, #1f2937);
}

.volume-slider::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  background: linear-gradient(
    135deg,
    var(--primary-color, #3b82f6),
    var(--primary-color-light, #60a5fa)
  );
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
  box-shadow:
    0 2px 4px rgba(59, 130, 246, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.dark .volume-slider::-moz-range-thumb {
  border: 2px solid var(--gray-800, #1f2937);
}

.volume-slider:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.volume-slider:disabled::-webkit-slider-thumb {
  transform: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.volume-slider:disabled::-moz-range-thumb {
  transform: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
