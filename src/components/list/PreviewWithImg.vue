<script setup>
import TagsList from "../TagsList.vue";
import { extractImgDimensionFromFileName } from "../../helpers/helpers.js";

const props = defineProps([
  "date",
  "localeDate",
  "tags",
  "preview",
  "authorName",
  "thumbnail",
]);

const THUMB_WIDTH = 280;
const imgFullSize = extractImgDimensionFromFileName(props.thumbnail);
let imgHeight;

if (imgFullSize) {
  const coef = imgFullSize[0] / imgFullSize[1];

  imgHeight = Math.round(THUMB_WIDTH / coef);
}
</script>

<template>
  <div class="md:flex w-full">
    <div v-if="props.thumbnail" class="md:mr-4 preview-img-col max-md:!w-full">
      <img :src="props.thumbnail" :width="THUMB_WIDTH" :height="imgHeight" loading="lazy" aria-hidden="true"
        class="w-full" />

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
}
</style>
