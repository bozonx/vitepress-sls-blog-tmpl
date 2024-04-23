<script lang="ts" setup>
import VPFlyout from 'vitepress/dist/client/theme-default/components/VPFlyout.vue'
import VPMenuLink from 'vitepress/dist/client/theme-default/components/VPMenuLink.vue'
import { useData } from 'vitepress'
import { useLangs } from 'vitepress/dist/client/theme-default/composables/langs.js'

const { theme } = useData()
const { localeLinks, currentLang } = useLangs({ correspondingLink: true })
</script>

<template>
  <VPFlyout
    v-if="localeLinks.length && currentLang.label"
    class="VPNavBarTranslations"
    icon="vpi-languages"
    :label="theme.langMenuLabel || 'Change language'"
  >
    <div class="items">
      <p class="switch-lang__title">{{ currentLang.label }}</p>

      <template v-for="locale in localeLinks" :key="locale.link">
        <VPMenuLink :item="locale" />
      </template>
    </div>
  </VPFlyout>
</template>

<style>
.VPNavBarTranslations {
  display: flex;
  align-items: center;
}

.VPNavBarTranslations > button {
  height: 40px !important;
  padding: 0 !important;
}

.VPNavBarTranslations .menu {
  top: calc(var(--vp-nav-height) / 2);
}

.switch-lang__title {
  padding: 0 24px 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
</style>
