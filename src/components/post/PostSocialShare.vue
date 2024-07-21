<script setup>
import { useData } from "vitepress";
import { ref, watchEffect } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps(["class"]);
const { theme, frontmatter, title } = useData();
const encodedDocUrl = ref("");
const siteFullTitle = encodeURIComponent(title.value);
const attrs = {
  class: "social-btn",
  target: "_blank",
  rel: "nofollow noopener",
};
const itemsParams = {
  telegram: {
    href: `https://t.me/share/url?url=${encodedDocUrl}&text=${siteFullTitle}`,
    icon: "logos:telegram",
    title: "Telegram",
  },
  whatsapp: {
    href: "",
    icon: "logos:whatsapp-icon",
    title: "Whatsapp",
  },
  vk: {
    href: "",
    icon: "cib:vk",
    title: "VK",
    class: "social-vk",
  },
  x: {
    href: "",
    icon: "ri:twitter-x-fill",
    title: "x.com",
  },
  facebook: {
    href: "",
    icon: "logos:facebook",
    title: "Facebook",
  },
};
const socialItems = (theme.value.socialMediaShares || "")
  .split(",")
  .filter((item) => !item)
  .map((item) => item.trim());
const items = socialItems.map((item) => {
  return {
    attrs,
  };
});

watchEffect(async () => {
  encodedDocUrl.value = encodeURIComponent(document.URL);
});

// // see https://yandex.ru/dev/share/doc/ru/
// const allowedLocales = [
//   "az",
//   "be",
//   "en",
//   "hy",
//   "ka",
//   "kk",
//   "ro",
//   "ru",
//   "tr",
//   "tt",
//   "uk",
//   "uz",
// ];
// const resolvedLocale = allowedLocales.includes(
//   String(localeIndex.value).slice(0, 2),
// )
//   ? localeIndex.value
//   : "en";

// const shareOnFacebook = () => {
//   const url =
//     "https://www.facebook.com/sharer/sharer.php?u=" +
//     encodeURIComponent(document.URL);
//   window.open(url, "_blank", "noopener");
// };
</script>

<template>
  <div v-if="typeof frontmatter.layout === 'undefined'"
    :class="['flex gap-y-3 max-sm:flex-col sm:items-center', props.class]">
    <div class="mr-2 muted">{{ theme.t.shareSocialMedia }}:</div>
    <div class="flex gap-x-2">
      <!-- <div class="ya-share2" data-size="l" :data-lang="resolvedLocale" data-curtain data-shape="round" data-copy="last" -->
      <!--   :data-services="theme.t.socialMediaShares"></div> -->

      <a :href="`https://t.me/share/url?url=${encodedDocUrl}&text=${siteFullTitle}`" title="Telegram" v-bind="attrs">
        <Icon icon="logos:telegram" aria-hidden="true" />
      </a>
      <a :href="`https://api.whatsapp.com/send?text=${siteFullTitle}%20${encodedDocUrl}`" title="Whatsapp"
        v-bind="attrs">
        <Icon icon="logos:whatsapp-icon" aria-hidden="true" />
      </a>
      <a :href="`https://vk.com/share.php?url=${encodedDocUrl}&title=${siteFullTitle}`" title="VK" v-bind="attrs">
        <Icon icon="cib:vk" aria-hidden="true" />
      </a>
      <a :href="`https://twitter.com/intent/tweet?text=${siteFullTitle}&url=${encodedDocUrl}`" title="X" v-bind="attrs">
        <Icon icon="ri:twitter-x-fill" aria-hidden="true" />
      </a>
      <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + encodedDocUrl" title="Facebook" v-bind="attrs">
        <Icon icon="logos:facebook" aria-hidden="true" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.ya-share2 {
  margin-right: 4px;
}

.social-btn svg {
  width: 48px;
  height: 48px;
}

.social-btn:hover {
  filter: brightness(85%);
}

.social-vk {
  color: #0077ff;
}
</style>
