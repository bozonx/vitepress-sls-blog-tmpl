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
  "onlyDark",
  "hideExternalIcon",
]);
const { class: className, ...bindProps } = props;
</script>

<template>
  <Btn v-bind="bindProps" noBg="true" :class="['rounded-none btn-lighter', className]">
    <slot>{{ props.text }}</slot>
  </Btn>
</template>
