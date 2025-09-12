<script setup>
import { useData } from 'vitepress'
import BaseLink from './BaseLink.vue'
import Badge from './Badge.vue'

const { theme } = useData()
const props = defineProps(['name', 'count', 'slug', 'sizeXl', 'sizeSm'])
const href = `${theme.value.tagsBaseUrl}/${props.slug}/1`
const className =
  'text-center rounded-full text-lg py-1 px-4 ' +
  'justify-center inline-flex space-x-2 items-center text-white ' +
  (props.sizeXl ? `text-xl ` : '') +
  (props.sizeSm ? `text-sm ` : '') +
  (props.count ? 'pr-2 ' : '') +
  `tag-item`
</script>

<template>
  <BaseLink :href="href" :class="className">
    <span>{{ props.name }}</span>
    <Badge
      v-if="props.count"
      :count="props.count"
      :title="theme.t.tagBadgeCount"
    />
  </BaseLink>
</template>

<style scoped>
.tag-item {
  background: var(--tag-item-bg);
  transition: all 0.2s ease-in-out;
}

.tag-item.active {
  background: var(--tag-item-bg-active);
}

.tag-item:hover {
  filter: brightness(115%);
  transform: translateY(-1px);
}
</style>
