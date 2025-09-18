<script setup>
import { useData } from 'vitepress'

import Btn from '../Btn.vue'
import SwitchAppearance from './SwitchAppearance.vue'
import SwitchLang from './SwitchLang.vue'

const props = defineProps(['class'])
const { theme, localeIndex } = useData()
const socialLinks = [
  ...(theme.value.sideBar.socialLinks || []),
  theme.value.sideBar.rssFeed && {
    text: theme.value.t.links.rssFeed,
    href: `/feed-${localeIndex.value}.rss`,
    target: '_blank',
    icon: theme.value.rssIcon,
  },
  theme.value.sideBar.atomFeed && {
    text: theme.value.t.links.atomFeed,
    href: `/feed-${localeIndex.value}.atom`,
    target: '_blank',
    icon: theme.value.atomIcon,
  },
]
</script>

<template>
  <div :class="['w-full flex pt-6 pb-3 pr-2 pl-2', props.class]">
    <ul v-if="socialLinks.length" class="flex space-x-1">
      <li v-for="item in socialLinks">
        <Btn noBg="true" v-bind="item" />
      </li>
    </ul>

    <div class="flex-1 flex justify-end">
      <div class="lg:hidden">
        <SwitchLang @click.stop dropUp="true" noBg="true" />
      </div>

      <div aria-hidden="true" class="lg:hidden">
        <SwitchAppearance @click.stop />
      </div>
    </div>
  </div>
</template>
