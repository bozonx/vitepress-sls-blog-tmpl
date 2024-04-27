<script setup>
import { useData } from 'vitepress'
import { resolveI18Href } from '../helpers/helpers.js'
import { Icon } from '@iconify/vue'

const { theme, localeIndex } = useData()
const props = defineProps(['class', 'href', 'target', 'icon'])
const resolvedHref = resolveI18Href(props.href, localeIndex.value, theme.value.i18nRouting)
</script>

<template>
<a
  :class="['flex items-center underline hover:text-gray-700 dark:hover:text-white', props.class]"
  :href="resolvedHref"
  :target="target"
>
  <span v-if="props.icon" class="mr-2"><Icon :icon="props.icon" /></span>
  <span><slot /></span>
</a>
</template>

