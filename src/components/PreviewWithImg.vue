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
    <div v-if="props.thumbnail" class="card-item-img-col">
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

      <div class="mt-2 space-x-2 muted card-item-author-date">
        <span v-if="props.authorName">{{ props.authorName }}.</span>
        <time v-if="props.date" :datetime="props.date">
          {{ props.localeDate }}
        </time>
      </div>

      <TagsList
        :tags="tags"
        class="mt-2"
        :sizeSm="true"
        activeCompareMethod="none"
      />
    </div>

    <p class="max-md:mt-5 flex-1 preview-text">
      {{ props.preview }}
    </p>
  </div>
</template>
