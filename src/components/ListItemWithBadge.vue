<script setup>
import Badge from './Badge.vue'
import SimpleLink from './SimpleLink.vue'

// Объявляем только те пропсы, которые обрабатываем в этом компоненте
const props = defineProps(['href', 'text', 'count'])
</script>

<template>
  <SimpleLink
    v-bind="$attrs"
    :href="props.href"
    class="no-underline text-2xl my-5 inline-flex gap-x-2"
  >
    <span>{{ props.text }}</span>
    <Badge :count="props.count" v-if="typeof props.count === 'number'" />
  </SimpleLink>
</template>
