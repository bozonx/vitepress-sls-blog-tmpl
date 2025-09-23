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
      <Btn
        v-if="!isPlayerVisible"
        primary="true"
        class="play-btn-header"
        :disabled="isDisabled || hasError"
        @click="togglePlayPause"
        :title="isPlaying ? 'Pause' : 'Play'"
        :icon="isLoading ? 'mdi:loading' : 'mdi:play'"
        :iconClass="{ spinning: isLoading }"
      />

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
        class="download-btn-header hover-animation-rise"
        @click="downloadFile"
      />
    </div>

    <!-- Аудио плеер (показывается при нажатии на play) -->
    <div v-if="isPlayerVisible" class="audio-player">
      <!-- Основные контролы -->
      <div class="player-controls">
        <!-- Кнопка воспроизведения/паузы -->
        <Btn
          class="play-btn"
          primary="true"
          :disabled="isDisabled || hasError"
          @click="togglePlayPause"
          :title="isPlaying ? 'Pause' : 'Play'"
          :icon="
            isLoading ? 'mdi:loading' : isPlaying ? 'mdi:pause' : 'mdi:play'
          "
          :iconClass="{ spinning: isLoading }"
        />

        <!-- Кнопка остановки -->
        <Btn
          class="stop-btn"
          :disabled="isDisabled || hasError || !isPlaying"
          @click="stopAudio"
          title="Stop"
          icon="mdi:stop"
        />

        <!-- Кнопка скрытия плеера -->
        <Btn
          class="hide-btn"
          @click="hidePlayer"
          title="Hide player"
          icon="mdi:chevron-up"
        />

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
  background: var(--gray-850);
  border-color: var(--gray-800);
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
  border-radius: 50%;
  transition: all 0.2s ease;
}

.play-btn-header:hover:not(:disabled) {
  transform: scale(1.05);
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
  background: var(--gray-50);
  border-radius: 0.5rem;
  border: 1px solid var(--gray-200);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease-out;
}

.dark .audio-player {
  background: var(--gray-950);
  border-color: var(--gray-800);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.play-btn,
.stop-btn,
.hide-btn {
  border-radius: 50%;
  transition: all 0.2s ease;
}

.play-btn:hover:not(:disabled),
.stop-btn:hover:not(:disabled),
.hide-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.time-display {
  display: flex;
  align-items: center;
  height: 1.75rem;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--gray-600);
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  min-width: 0;
  font-weight: 500;
  background: var(--gray-100);
  padding: 0 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid var(--gray-200);
}

.dark .time-display {
  color: var(--gray-400);
  background: var(--gray-800);
  border-color: var(--gray-700);
}

.time-separator {
  color: var(--gray-400);
  font-weight: 400;
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
  padding: 0.75rem 0;
}

.progress-track {
  width: 100%;
  height: 0.5rem;
  background: var(--gray-200);
  border-radius: 0.25rem;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.dark .progress-track {
  background: var(--gray-700);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
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
  background: var(--gray-200);
  border-radius: 0.1875rem;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.dark .volume-slider {
  background: var(--gray-700);
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

/* .volume-slider:disabled {
  cursor: not-allowed;
  opacity: 0.5;
} */

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
}
</style>
