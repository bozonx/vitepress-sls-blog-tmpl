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
  "disabled",
  "iconClass",
]);
const isExternal = isExternalUrl(props.href);
</script>

<template>
  <BaseLink :id="props.id" :class="[
    'flex cursor-pointer items-center rounded-lg btn-base',
    !props.text && 'icon-only',
    props.disabled && 'disabled',
    props.class,
  ]" :href="props.href" :target="props.target" :title="props.title">
    <span class="flex items-center gap-x-2">
      <span v-if="props.icon">
        <Icon :icon="props.icon" :class="props.iconClass" />
      </span>
      <span v-if="props.text">{{ props.text }}</span>
    </span>
    <span v-if="theme.externalLinkIcon && isExternal && text" class="btn-base__external">
      <Icon icon="mdi:arrow-top-right" class="text-gray-400 dark:text-gray-600" />
    </span>
  </BaseLink>
</template>

<style>
.btn-base__external {
  padding-left: 0.25rem;
  font-size: 13px;
}

.btn-base {
  padding: 0.5rem 1.25rem 0.5rem 1.25rem;
}

.btn-base.icon-only {
  padding: 0.75rem;
}

.btn-base:hover {
  background: var(--btn-bg-hover);
  color: var(--btn-text-hover);
}

.btn-base.active {
  background: var(--btn-bg-active);
}

.btn-base.active:hover {
  background: var(--btn-bg-active-hover);
}

.btn-base.disabled {
  background: none !important;
  cursor: default;
  color: var(--btn--disabled);
}

.dark .btn-base:hover {
  background: var(--btn-dark-bg-hover);
  color: var(--btn-dark-text-hover);
}

.dark .btn-base.active {
  background: var(--btn-dark-bg-active);
}

.dark .btn-base.active:hover {
  background: var(--btn-dark-bg-active-hover);
}

.dark .btn-base.disabled {
  color: var(--btn-dark-disabled);
}
</style>
