<script setup>
import { useData } from 'vitepress'
import { useAttrs } from 'vue'
import { isExternalUrl } from '../helpers/helpers.js'
import BaseLink from './BaseLink.vue'

const props = defineProps(['class', 'hideExternalIcon'])
const $attrs = useAttrs()

const { theme } = useData()
const isExternal = !props.hideExternalIcon && isExternalUrl($attrs.href)
</script>

<template>
  <BaseLink
    v-bind="$attrs"
    :class="[
      'simple-link',
      theme.externalLinkIcon && isExternal && 'vp-external-link-icon',
      props.class,
    ]"
  >
    <slot />
  </BaseLink>
</template>

<style>
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
