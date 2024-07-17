<script setup>
import { useData } from "vitepress";
import Btn from "./Btn.vue";

const { theme } = useData();
const props = defineProps([
  "id",
  "class",
  "href",
  "title",
  "target",
  "icon",
  "text",
  "disabled",
  "iconClass",
  "hideExternalIcon",
]);
</script>

<template>
  <Btn
    v-bind="props"
    noBg="true"
    :class="['rounded-none btn-lighter', props.class]"
  >
    <slot>{{ props.text }}</slot>
  </Btn>
</template>
