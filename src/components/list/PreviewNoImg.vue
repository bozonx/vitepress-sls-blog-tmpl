<script setup>
import TagsList from "../TagsList.vue";

const props = defineProps([
  "date",
  "localeDate",
  "tags",
  "preview",
  "authorName",
]);
</script>

<template>
  <p class="preview-text">{{ props.preview }}</p>

  <div class="flex max-sm:flex-col-reverse sm:items-end sm:mt-4 gap-x-1">
    <TagsList :tags="props.tags" class="flex-1" :sizeSm="true" />

    <div class="space-x-2 max-sm:mt-2 max-sm:mb-4 text-right muted preview-author-date">
      <span v-if="props.authorName">{{ props.authorName }}.</span>
      <time v-if="props.date" :datetime="props.date">
        {{ props.localeDate }}
      </time>
    </div>
  </div>
</template>
