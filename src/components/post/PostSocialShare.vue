<script setup>
import { useData } from "vitepress";

const props = defineProps(["class"]);
const { theme, frontmatter, localeIndex } = useData();
// see https://yandex.ru/dev/share/doc/ru/
const allowedLocales = [
  "az",
  "be",
  "en",
  "hy",
  "ka",
  "kk",
  "ro",
  "ru",
  "tr",
  "tt",
  "uk",
  "uz",
];
const resolvedLocale = allowedLocales.includes(
  String(localeIndex.value).slice(0, 2),
)
  ? localeIndex.value
  : "en";
</script>

<template>
  <div v-if="typeof frontmatter.layout === 'undefined'"
    :class="['flex gap-y-3 max-sm:flex-col sm:items-center', props.class]">
    <div class="mr-2">{{ theme.t.shareSocialMedia }}:</div>
    <div>
      <div class="ya-share2" data-size="l" :data-lang="resolvedLocale" data-curtain data-shape="round" data-copy="last"
        :data-services="theme.t.socialMediaShares"></div>
    </div>
  </div>
</template>
