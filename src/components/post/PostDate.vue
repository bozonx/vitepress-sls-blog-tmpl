<script setup>
import { useData } from 'vitepress'

import { makeHumanDate } from '../../helpers/helpers.js'
import BaseLink from '../BaseLink.vue'

const props = defineProps(['class'])
const { page, theme, lang } = useData()
const rawDate = page.value.frontmatter.date

// Список поддерживаемых языков (европейские + ближневосточные)
const supportedLanguages = [
  'en',
  'ru',
  'de',
  'fr',
  'es',
  'it',
  'pt',
  'nl',
  'pl',
  'cs',
  'sk',
  'hu',
  'sv',
  'no',
  'da',
  'fi',
  'ar',
  'he',
  'uk',
  'be',
  'bg',
  'hr',
  'sr',
  'sl',
  'et',
  'lv',
  'lt',
  'ro',
  'el',
  'tr',
]

// Проверяем, поддерживается ли язык
const isLanguageSupported = (language) => supportedLanguages.includes(language)

// Получаем год и месяц для создания ссылок
const year = new Date(rawDate)?.getUTCFullYear()
const month = new Date(rawDate)?.getUTCMonth() + 1

// Используем поддерживаемый язык или fallback на английский
const effectiveLang = isLanguageSupported(lang.value) ? lang.value : 'en'
const localeDate = makeHumanDate(rawDate, effectiveLang)

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
    'van',
    'den',
    'der',
    'des',
    'del',
    'da',
    'di',
    'du',
    'of',
    'the',
    'a',
    'an',
    'in',
    'on',
    'at',
  ]
  const cleanItem = item.replace(/[^\wа-яё]/gi, '').toLowerCase()

  // Проверяем, что это не служебное слово и достаточно длинное
  return (
    cleanItem.length >= 3 &&
    !excludedWords.includes(cleanItem) &&
    /^[^\d\.\-\,]{3,}$/.test(item)
  )
}

// Показываем предупреждение в dev режиме для неподдерживаемых языков
if (import.meta.env.DEV && !isLanguageSupported(lang.value)) {
  console.warn(
    `[PostDate] Language "${lang.value}" is not fully supported. Using English fallback. ` +
      `Supported languages: ${supportedLanguages.join(', ')}`
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
