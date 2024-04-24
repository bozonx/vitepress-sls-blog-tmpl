<script setup>
import { useData } from 'vitepress'
import { makeHumanDate } from '../helpers.js'

const { page, lang } = useData()
const rawDate = page.value.filePath.match(/^[\w\-]+\/([\d\-]+)\//)?.[1]
const localeDate = makeHumanDate(rawDate, lang.value)
</script>

<template v-if="rawDate">
<div>
  <time :datetime="rawDate" class="text-sm text-gray-400 dark:text-gray-500">{{localeDate}}</time>
</div>
</template>

