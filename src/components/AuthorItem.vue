<template>
  <a
    :href="`/${localeIndex}/${theme.authorsBaseUrl}/${props.item.id}/1`"
    class="mb-5 px-5 py-5 card-item author-preview"
  >
    <h2 class="card-item-header">{{ props.item.name }}</h2>

    <div class="md:flex w-full">
      <!-- Картинка автора -->
      <div
        v-if="props.item.image"
        class="md:mr-4 author-img-col max-md:w-full!"
      >
        <img
          :src="props.item.image"
          :height="props.item.imageHeight"
          :width="props.item.imageWidth"
          :sizes="`(max-width: ${PHONE_BREAKPOINT}px) 100vw, 280px`"
          loading="lazy"
          :alt="props.item.name"
          class="w-full rounded"
        />
      </div>

      <!-- Описание автора -->
      <div class="max-md:mt-5 flex-1 author-content">
        <p v-if="props.item.description" class="author-description">
          {{ props.item.description }}
        </p>

        <!-- Счетчик постов для случая без картинки -->
        <div class="mt-4 space-x-2 muted author-count">
          <span>{{ theme.t.postsCount }}: {{ props.item.count }}</span>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
import { useData } from 'vitepress'
import { PHONE_BREAKPOINT } from '../constants.js'

const props = defineProps(['item'])
const { theme, localeIndex } = useData()

console.log(props.item)
</script>

<style scoped>
.author-img-col {
  width: var(--list-item-thumb-width);
  flex-shrink: 0;
}

.author-img-col img {
  object-fit: cover;
  display: block;
  max-width: 100%;
}

.author-description {
  color: var(--text-color);
  line-height: 1.6;
}

.author-count {
  font-size: 0.9em;
  color: var(--text-color-muted);
}

/* На экранах меньше 766px изображение занимает всю ширину */
@media (max-width: 766px) {
  .author-img-col {
    width: 100%;
  }

  .author-img-col img {
    width: 100%;
  }
}

/* На экранах больше 766px изображение имеет фиксированную ширину */
@media (min-width: 767px) {
  .author-img-col img {
    width: 280px;
  }
}
</style>
