<script lang="ts" setup>
// see https://github.com/vuejs/vitepress/blob/9b1bb4ffc6423ef0f16a213133980fdb6e9bf552/src/client/theme-default/components/VPNavScreenTranslations.vue
import { useData } from 'vitepress'
import { useLangs } from 'vitepress/dist/client/theme-default/composables/langs.js'

import DropdownButton from '../DropdownButton.vue'
import DropdownItem from '../DropdownItem.vue'
import { Icon } from '@iconify/vue'

const { theme } = useData()
const { localeLinks, currentLang } = useLangs({ correspondingLink: true })
const props = defineProps(['noBg', 'onlyDark'])
// redirect from specific tag to tags list
const resolveLink = (link) => {
  if (!link) return link

  const splat = link.split('/')

  if (splat[2] === theme.value.tagsBaseUrl) {
    return `/${splat[1]}/${theme.value.allTagsUrl}`
  }

  return link
}
</script>

<template>
  <DropdownButton
    v-if="localeLinks.length && currentLang.label"
    :noBg="props.noBg"
    :onlyDark="props.onlyDark"
    :title="theme.langMenuLabel || 'Change language'"
    class="switch-lang-btn"
  >
    <template #btn-text>
      <span class="pt-1" aria-hidden="true">
        <Icon
          alt="Translation icon"
          icon="material-symbols:translate"
          width="1.2rem"
          height="1.2rem"
        />
      </span>
    </template>
    <template v-for="locale in localeLinks">
      <DropdownItem
        v-if="!locale.text"
        :key="locale.link + 'disabled'"
        disabled="true"
        :onlyDark="props.onlyDark"
        :title="theme.t.currentLang"
      >
        {{ currentLang.label }}
      </DropdownItem>
      <DropdownItem
        v-else
        target="_self"
        :key="locale.link"
        :href="resolveLink(locale.link)"
        :onlyDark="props.onlyDark"
      >
        {{ locale.text }}
      </DropdownItem>
    </template>
  </DropdownButton>
</template>

<style scoped>
.switch-lang-btn {
  padding-left: 0;
  padding-right: 0;
}
</style>
