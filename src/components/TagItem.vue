
<script setup>
import { useData } from 'vitepress'
import { resolveI18Href } from '../helpers.js'

const { page, theme, localeIndex } = useData()
const props = defineProps(['text'])
// TODO: transliterate
const transliterated = props.text
const baseHref = resolveI18Href(
  theme.value.tagsBaseUrl,
  localeIndex.value,
  theme.value.i18nRouting
)
const href = `${baseHref}/${transliterated}/1`
</script>

<template>
<a
  :href="href"
  class="text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center justify-center text-sm text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus-within:ring-blue-300 dark:focus-within:ring-blue-800 rounded-full py-1 px-4"
>{{props.text}}</a>
</template>

