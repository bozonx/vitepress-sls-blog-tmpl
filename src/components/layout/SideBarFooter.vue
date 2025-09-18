<script setup>
import { useData } from 'vitepress'

import Btn from '../Btn.vue'
import SwitchAppearance from './SwitchAppearance.vue'
import SwitchLang from './SwitchLang.vue'

const props = defineProps(['class'])
const { theme } = useData()
const socialLinks = [
  ...(theme.value.socialLinks || []),
  theme.value.sideBar.donate && {
    text: theme.value.t.links.donate,
    href: `${theme.value.donate.url}`,
    icon: theme.value.donate.icon || theme.value.donateIcon,
    iconClass: 'donate-icon',
  },
]
</script>

<template>
  <div
    :class="['w-full flex justify-end pt-10 pb-3 pr-2 space-x-1', props.class]"
  >
    <div class="lg:hidden">
      <SwitchLang @click.stop dropUp="true" noBg="true" />
    </div>

    <div aria-hidden="true" class="lg:hidden">
      <SwitchAppearance @click.stop />
    </div>

    <ul v-if="socialLinks.length" class="flex space-x-1">
      <li v-for="item in socialLinks">
        <Btn noBg="true" v-bind="item" />
      </li>
    </ul>
  </div>
</template>
