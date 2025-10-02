<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { isExternalUrl } from '../helpers/helpers.js'
import BaseLink from './BaseLink.vue'

const props = defineProps(['class', 'href', 'hideExternalIcon'])

const { theme } = useData()
const isExternal = !props.hideExternalIcon && isExternalUrl(props.href)
</script>

<template>
  <BaseLink
    v-bind="$attrs"
    :class="[
      'simple-link',
      theme.externalLinkIcon && isExternal && 'external-link',
      props.class,
    ]"
  >
    <slot />
  </BaseLink>
</template>

<style scoped>
.simple-link {
  text-decoration: underline;
  color: var(--link-a-text);
}

.simple-link:visited {
  color: var(--link-a-visited);
}

.simple-link:hover {
  filter: brightness(130%);
}
</style>
