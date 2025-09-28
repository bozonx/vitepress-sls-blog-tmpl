<script setup>
import TagsList from './TagsList.vue'
import { PHONE_BREAKPOINT } from '../constants.js'

const props = defineProps([
  'date',
  'localeDate',
  'tags',
  'preview',
  'authorName',
  'thumbnail',
  'coverHeight',
  'coverWidth',
])
</script>

<template>
  <div class="md:flex w-full">
    <div v-if="props.thumbnail" class="md:mr-4 preview-img-col max-md:w-full!">
      <img
        :src="props.thumbnail"
        :height="coverHeight"
        :width="coverWidth"
        :sizes="`(max-width: ${PHONE_BREAKPOINT}px) 100vw, 280px`"
        loading="lazy"
        aria-hidden="true"
        class="w-full rounded"
        alt=""
      />

      <div class="mt-2 space-x-2 muted preview-author-date">
        <span v-if="props.authorName">{{ props.authorName }}.</span>
        <time v-if="props.date" :datetime="props.date">
          {{ props.localeDate }}
        </time>
      </div>

      <TagsList :tags="tags" class="mt-2" :sizeSm="true" />
    </div>

    <p class="max-md:mt-5 flex-1 preview-text">
      {{ props.preview }}
    </p>
  </div>
</template>

<style scoped>
.preview-img-col {
  width: var(--list-item-thumb-width);
  flex-shrink: 0;
}

.preview-img-col img {
  object-fit: cover;
  display: block;
  max-width: 100%;
}

/* На экранах меньше 766px изображение занимает всю ширину */
@media (max-width: 766px) {
  .preview-img-col {
    width: 100%;
  }

  .preview-img-col img {
    width: 100%;
    /* Высота будет установлена через атрибут height */
  }
}

/* На экранах больше 766px изображение имеет фиксированную ширину */
@media (min-width: 767px) {
  .preview-img-col img {
    width: 280px;
    /* Высота будет установлена через атрибут height */
  }
}
</style>
