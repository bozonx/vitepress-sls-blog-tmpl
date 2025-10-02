<template>
  <a
    :href="`/${localeIndex}/${theme.authorsBaseUrl}/${props.item.id}/1`"
    class="mb-5 px-5 py-5 card-item author-preview"
  >
    <h2 class="card-item-header">{{ props.item.name }}</h2>

    <div class="md:flex w-full">
      <!-- Картинка автора -->
      <div v-if="props.item.image" class="card-item-img-col">
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
        <p v-if="props.item.description" class="card-item-description">
          {{ props.item.description }}
        </p>

        <div class="mt-4 muted">
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
