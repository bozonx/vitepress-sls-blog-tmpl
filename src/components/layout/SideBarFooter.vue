<script setup>
import { useData } from "vitepress";
import { Icon } from "@iconify/vue";
import VPSwitchAppearance from "vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue";
import Btn from "../Btn.vue";
import SwitchLang from "./SwitchLang.vue";

const props = defineProps(["class"]);
const { theme } = useData();
</script>

<template>
  <div :class="[
    'w-full flex justify-end items-end pt-10 pb-3 pr-2 space-x-1',
    props.class,
  ]">
    <div class="px-4">
      <SwitchLang @click.stop />
    </div>

    <div class="px-4 py-2">
      <VPSwitchAppearance @click.stop />
    </div>

    <ul v-if="theme.ui.topBar.socialLinks" class="flex space-x-1">
      <li v-for="item in theme.ui.topBar.socialLinks">
        <Btn :href="item.href" :icon="item.icon" />
      </li>
    </ul>
  </div>
</template>
