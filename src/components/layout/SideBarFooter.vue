<script setup>
import { useData } from "vitepress";
import { Icon } from "@iconify/vue";
import SwitchAppearance from "./SwitchAppearance.vue";
import Btn from "../Btn.vue";
import SwitchLang from "./SwitchLang.vue";

const props = defineProps(["class"]);
const { theme } = useData();
</script>

<template>
  <div
    :class="['w-full flex justify-end pt-10 pb-3 pr-2 space-x-1', props.class]"
  >
    <div>
      <SwitchLang @click.stop dropUp="true" />
    </div>

    <div aria-hidden="true">
      <SwitchAppearance @click.stop />
    </div>

    <ul v-if="theme.socialLinks" class="flex space-x-1">
      <li v-for="item in theme.socialLinks">
        <Btn noBg="true" v-bind="item" />
      </li>
    </ul>
  </div>
</template>
