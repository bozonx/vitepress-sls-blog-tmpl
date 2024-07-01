<script setup>
import { useData } from "vitepress";
import { Icon } from "@iconify/vue";
import { isExternalUrl } from "../helpers/helpers.js";
import BaseLink from "./BaseLink.vue";

const { theme } = useData();
const props = defineProps([
  "id",
  "class",
  "href",
  "title",
  "target",
  "icon",
  "text",
  "iconClass",
]);
const isExternal = isExternalUrl(props.href);
</script>

<template>
  <BaseLink :id="props.id" :class="[
    'flex cursor-pointer items-center hover:text-gray-700 dark:hover:text-white',
    props.class,
  ]" :href="props.href" :target="props.target" :title="props.title">
    <span class="flex items-center gap-x-2">
      <span v-if="props.icon">
        <Icon :icon="props.icon" :class="props.iconClass" />
      </span>
      <span v-if="props.text">{{ props.text }}</span>
    </span>
    <span v-if="theme.externalLinkIcon && isExternal && text" class="btn-link__external">
      <Icon icon="mdi:arrow-top-right" class="text-gray-400 dark:text-gray-600" />
    </span>
  </BaseLink>
</template>

<style>
.btn-link__external {
  padding-left: 0.25rem;
  font-size: 13px;
}
</style>
