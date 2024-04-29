<script setup>
import { useData } from 'vitepress'
import { Icon } from '@iconify/vue'
import { isExternalUrl } from '../helpers/helpers.js'
import BaseLink from './BaseLink.vue'

const { theme } = useData()
const props = defineProps(['id', 'class', 'href', 'target', 'icon', 'text'])
const isExternal = isExternalUrl(props.href)
</script>

<template>
<BaseLink
  :id="props.id"
  :class="['flex cursor-pointer items-center hover:text-gray-700 dark:hover:text-white', props.class]"
  :href="props.href"
  :target="props.target"
>
  <span class="flex items-center gap-x-2">
    <span v-if="props.icon">
      <Icon :icon="props.icon" class="text-gray-500 dark:text-gray-400" />
    </span>
    <span>{{props.text}}</span>
  </span>
  <span v-if="theme.externalLinkIcon && isExternal && text" class="relative">
    <span class="btn-link__external-inner">
      <Icon icon="fa6-solid:arrow-up-right-from-square" class="text-gray-500 dark:text-gray-400" />
    </span>
  </span>
</BaseLink>
</template>

