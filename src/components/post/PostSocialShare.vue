<script setup>
import { useData } from "vitepress";
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps(["class"]);
const { theme, frontmatter, title } = useData();
const siteFullTitle = encodeURIComponent(title.value);
const items = ref([]);
const attrs = {
  class: "social-btn",
  target: "_blank",
  rel: "nofollow noopener",
};
const socialItems = (theme.value.socialMediaShares || "")
  .split(",")
  .filter((item) => Boolean(item))
  .map((item) => item.trim());

const makeItems = () => {
  const encodedDocUrl = encodeURIComponent(document.URL);
  const itemsParams = {
    telegram: {
      href: `https://t.me/share/url?url=${encodedDocUrl}&text=${siteFullTitle}`,
      icon: "logos:telegram",
      title: "Telegram",
      attrs,
    },
    whatsapp: {
      href: `https://api.whatsapp.com/send?text=${siteFullTitle}%20${encodedDocUrl}`,
      icon: "logos:whatsapp-icon",
      title: "Whatsapp",
      attrs,
    },
    vk: {
      href: `https://vk.com/share.php?url=${encodedDocUrl}&title=${siteFullTitle}`,
      icon: "cib:vk",
      title: "VK",
      attrs: {
        ...attrs,
        class: `${attrs.class} social-vk`,
      },
    },
    x: {
      href: `https://twitter.com/intent/tweet?text=${siteFullTitle}&url=${encodedDocUrl}`,
      icon: "ri:twitter-x-fill",
      title: "X.com",
      attrs,
    },
    facebook: {
      href: "https://www.facebook.com/sharer/sharer.php?u=" + encodedDocUrl,
      icon: "logos:facebook",
      title: "Facebook",
      attrs,
    },
  };

  return socialItems.map((item) => itemsParams[item]);
};

onMounted(() => {
  items.value = makeItems();
});
</script>

<template>
  <div v-if="typeof frontmatter.layout === 'undefined' && theme.socialMediaShares"
    :class="['flex gap-y-3 max-sm:flex-col sm:items-center', props.class]">
    <div class="mr-2 muted">{{ theme.t.shareSocialMedia }}:</div>
    <div class="flex gap-x-2">
      <template v-for="item in items">
        <a :href="item.href" :title="item.title" v-bind="item.attrs">
          <Icon :icon="item.icon" aria-hidden="true" />
        </a>
      </template>
    </div>
  </div>
</template>

<style scoped>
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
