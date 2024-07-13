<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { useData } from "vitepress";
import { useLangs } from "vitepress/dist/client/theme-default/composables/langs.js";
import DropdownButton from "../DropdownButton.vue";
import DropdownItem from "../DropdownItem.vue";

const { theme } = useData();
const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
</script>

<template>
  <DropdownButton v-if="localeLinks.length && currentLang.label" :title="theme.langMenuLabel || 'Change language'"
    class="switch-lang-btn">
    <template #btn-text>
      <span class="pt-1" aria-hidden="true">
        <Icon alt="Translation icon" icon="material-symbols:translate" width="1.2rem" height="1.2rem" />
      </span>
    </template>
    <template v-for="locale in localeLinks">
      <DropdownItem v-if="!locale.text" disabled="true" :title="theme.t.currentLang">
        {{ currentLang.label }}
      </DropdownItem>
      <DropdownItem v-else :href="locale.link">
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
