<script setup>
import { useData } from 'vitepress'

import { makeHumanDate } from '../../helpers/helpers.js'
import BaseLink from '../BaseLink.vue'

const props = defineProps(['class'])
const { page, theme, lang } = useData()
const rawDate = page.value.frontmatter.date

// Получаем год и месяц для создания ссылок
const year = new Date(rawDate)?.getUTCFullYear()
const month = new Date(rawDate)?.getUTCMonth() + 1
const localeDate = makeHumanDate(rawDate, lang.value)

// Функция для определения, является ли элемент годом
const isYear = (item) => {
  // Убираем точки и другие символы для проверки года
  const cleanItem = item.replace(/[^\d]/g, '')
  return cleanItem.length === 4 && /^\d{4}$/.test(cleanItem)
}

// Функция для определения, является ли элемент месяцем
const isMonth = (item) => {
  // Исключаем служебные слова и короткие элементы
  const excludedWords = [
    'de',
    'г',
    'г.',
    'of',
    'van',
    'der',
    'den',
    'del',
    'da',
    'di',
    'du',
    'des',
    'von',
    'zu',
    'zur',
  ]
  const cleanItem = item.replace(/[^\wа-яё]/gi, '').toLowerCase()

  // Проверяем, что это не служебное слово и достаточно длинное
  return (
    cleanItem.length >= 3 &&
    !excludedWords.includes(cleanItem) &&
    /^[^\d\.\-\,]{3,}$/.test(item)
  )
}
</script>

<template>
  <div v-if="rawDate" :class="['text-base muted post-date', props.class]">
    <time :datetime="rawDate" class="space-x-1">
      <template v-for="item in localeDate.split(' ')">
        <!-- Ссылка на год -->
        <BaseLink
          :href="`${theme.archiveBaseUrl}/${year}`"
          v-if="isYear(item)"
          :key="`year-${item}`"
        >
          {{ item }}
        </BaseLink>
        <!-- Ссылка на месяц -->
        <BaseLink
          :href="`${theme.archiveBaseUrl}/${year}/${month}`"
          v-else-if="isMonth(item)"
          :key="`month-${item}`"
        >
          {{ item }}
        </BaseLink>
        <!-- Обычный текст -->
        <span v-else :key="`text-${item}`">{{ item }}</span>
      </template>
    </time>
  </div>
</template>

<style scoped>
.post-date a {
  text-decoration: underline;
}

.post-date a:hover {
  filter: brightness(140%);
}
</style>
