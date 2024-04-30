<script setup>
import { useData } from 'vitepress'
import BaseLink from '../BaseLink.vue'

const props = defineProps(['class'])
const { page, theme, lang } = useData()
const pathSplit = page.value.filePath.split('/')
const rawDate = pathSplit[pathSplit.length - 2]
const rawDateSplit = rawDate.split('-')
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}
const localeDate = (new Date(rawDate)).toLocaleDateString(lang.value, options)
const linkClass = 'underline hover:text-gray-500 hover:dark:text-gray-400'
</script>

<template>
<div
  v-if="rawDate"
  :class="props.class"
>
  <time
    :datetime="rawDate"
    :class="['text-base space-x-1 text-gray-400 dark:text-gray-500']"
  >
    <template v-for="item in localeDate.split(' ')">
      <BaseLink
        :href="`${theme.archiveBaseUrl}/${item}`"
        v-if="item.match(/^\d{4,4}$/)"
        :class="linkClass"
      >{{item}}</BaseLink>
      <BaseLink
        :href="`${theme.archiveBaseUrl}/${rawDateSplit[0]}/${Number(rawDateSplit[1])}`"
        v-else-if="item.match(/^[^\d\.\-\,]{2,}$/)"
        :class="linkClass"
      >{{item}}</BaseLink>
      <span v-else>{{item}}</span>
    </template>
  </time>
</div>
</template>

