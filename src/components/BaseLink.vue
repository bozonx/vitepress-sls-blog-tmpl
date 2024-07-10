<script setup>
import { useData, useRoute } from "vitepress";
import { resolveI18Href, isExternalUrl } from "../helpers/helpers.js";

const { theme, localeIndex } = useData();
const route = useRoute();
const props = defineProps([
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
const aOrBtn = props.href ? "a" : "button";
</script>

<template>
  <component :is="aOrBtn" :target="props.href && target" :href="resolvedHref" :class="[active && 'active', props.class]"
    :title="props.title" :disabled="!props.href && props.disabled">
    <slot />
  </component>
</template>
