<script setup>
import TagItem from "./TagItem.vue";
import { makeTagsList } from "../helpers/listHelpers.js";

const props = defineProps(["tags", "sizeXl", "sizeSm", "class"]);
const sizeClasses = {
  xl: "gap-x-3 gap-y-4",
  md: "gap-x-2 gap-y-3",
  sm: "gap-x-2 gap-y-3",
};
const sizeClass =
  sizeClasses[(props.sizeXl && "xl") || (props.sizeSm && "sm") || "md"];
</script>

<template>
  <ul v-if="props.tags.length" :class="['flex flex-wrap', sizeClass, props.class]">
    <li v-for="item in props.tags">
      <TagItem v-bind="item" :sizeXl="props.sizeXl" :sizeSm="props.sizeSm" />
    </li>
  </ul>
</template>
