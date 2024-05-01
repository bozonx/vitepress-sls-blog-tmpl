
<script setup>
import { useData } from 'vitepress'
import BaseLink from './BaseLink.vue'
import { transliterate } from '../helpers/transliterate.js'

const { theme } = useData()
const props = defineProps(['text', 'count', 'sizeXl', 'sizeSm'])
const preparedTag = transliterate(props.text)
const href = `${theme.value.tagsBaseUrl}/${preparedTag}/1`
const className = 'text-center font-medium rounded-full text-lg py-1 px-4 '
  + 'justify-center inline-flex items-center text-white '
  + 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 '
  + ((props.sizeXl) ? `text-xl ` : '')
  + ((props.sizeSm) ? `text-sm ` : '')
  + `tag-item`
  //+ `focus-within:ring-blue-300 dark:focus-within:ring-blue-800 `
  //+ `focus-within:ring-4 focus-within:outline-none `
</script>

<template>
<BaseLink :href="href" :class="className">
  <span>{{props.text}}</span>
  <span v-if="props.count" class="ml-1"> ({{props.count}})</span>
</BaseLink>
</template>

