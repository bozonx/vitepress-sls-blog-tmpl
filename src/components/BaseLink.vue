<script setup>
import { useData, useRoute } from "vitepress";
import { resolveI18Href, isExternalUrl } from "../helpers/helpers.js";

const { theme, localeIndex } = useData();
const route = useRoute();
const props = defineProps([
  "tag",
  "id",
  "class",
  "title",
  "href",
  "target",
  "disabled",
]);
const resolvedHref = resolveI18Href(
  props.href,
  localeIndex.value,
  theme.value.i18nRouting,
);
const active = route.path === resolvedHref;
const isExternal = isExternalUrl(props.href);
const target = isExternal && !props.target ? "_blank" : props.target;
const { tag = "a", ...bindProps } = props;
</script>

<template>
  <component :is="tag" v-bind="bindProps" :href="resolvedHref" :class="[active && 'active', props.class]">
    <slot />
  </component>
</template>
