<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { useData } from "vitepress";
import { useLangs } from "vitepress/dist/client/theme-default/composables/langs.js";
import DropdownButton from "../DropdownButton.vue";
import Btn from "../Btn.vue";

const { theme } = useData();
const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
</script>

<template>
  <DropdownButton
    v-if="localeLinks.length && currentLang.label"
    :label="theme.langMenuLabel || 'Change language'"
    class="switch-lang-btn"
  >
    <template #btn-text>
      <span class="pt-1">
        <Icon
          alt="Translation icon"
          icon="material-symbols:translate"
          width="1.2rem"
          height="1.2rem"
        />
      </span>
    </template>
    <template v-for="locale in localeLinks">
      <Btn v-if="!locale.text" disabled="true">{{ currentLang.label }}</Btn>
      <Btn v-else :href="locale.link" class="rounded-none">
        {{ locale.text }}
      </Btn>
    </template>
  </DropdownButton>
</template>

<style>
.switch-lang-btn {
  padding-left: 0;
  padding-right: 0;
}
</style>
