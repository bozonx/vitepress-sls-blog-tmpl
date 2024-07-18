<script setup>
import TagsList from "../TagsList.vue";

const props = defineProps([
  "pubDate",
  "localeDate",
  "tags",
  "preview",
  "authorName",
]);
</script>

<template>
  <p class="preview-text">{{ props.preview }}</p>

  <div class="flex items-end mt-4 gap-x-1">
    <TagsList :tags="props.tags" class="flex-1 mr-2" :sizeSm="true" />

    <div class="space-x-2 preview-author-date">
      <span v-if="props.authorName">{{ props.authorName }}.</span>
      <time v-if="props.pubDate" :datetime="props.pubDate">
        {{ props.localeDate }}
      </time>
    </div>
  </div>
</template>
