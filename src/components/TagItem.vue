
<script setup>
import { useData } from 'vitepress'
import BaseLink from './BaseLink.vue'
import { transliterate } from '../helpers/transliterate.js'


const { theme } = useData()
const props = defineProps(['text', 'count'])
const preparedTag = transliterate(props.text)
const href = `${theme.value.tagsBaseUrl}/${preparedTag}/1`
</script>

<template>
<BaseLink
  :href="href"
  class="text-center font-medium focus-within:ring-4focus-within:outline-none inline-flex items-center justify-center text-sm text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus-within:ring-blue-300 dark:focus-within:ring-blue-800 rounded-full py-1 px-4"
  >
  <span>{{props.text}}</span>
  <span v-if="props.count" class="ml-1"> ({{props.count}})</span>
</BaseLink>
</template>

