<script setup>
import { useData } from "vitepress";
import { Icon } from "@iconify/vue";

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

const shareOnFacebook = () => {
  const url =
    "https://www.facebook.com/sharer/sharer.php?u=" +
    encodeURIComponent(document.URL);
  window.open(url, "_blank");
};
</script>

<template>
  <div
    v-if="typeof frontmatter.layout === 'undefined'"
    :class="['flex gap-y-3 max-sm:flex-col sm:items-center', props.class]"
  >
    <div class="mr-2">{{ theme.t.shareSocialMedia }}:</div>
    <div class="flex">
      <div
        class="ya-share2"
        data-size="l"
        :data-lang="resolvedLocale"
        data-curtain
        data-shape="round"
        data-copy="last"
        :data-services="theme.t.socialMediaShares"
      ></div>
      <button
        @click="shareOnFacebook"
        class="social-additional-icon"
        title="Facebook"
      >
        <Icon icon="logos:facebook" />
      </button>
    </div>
  </div>
</template>

<style>
.ya-share2 {
  margin-right: 4px;
}

.social-additional-icon svg {
  width: 48px;
  height: 48px;
}

.social-additional-icon:hover {
  filter: brightness(85%);
}
</style>
