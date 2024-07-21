<script setup>
import { useData, useRoute } from "vitepress";
import { ref, watchEffect } from "vue";
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
const isExternal = isExternalUrl(props.href);
const { tag = "a", class: className, ...bindProps } = props;
let prevPath = route.path;
const active = ref(prevPath === resolvedHref);
let target;

if (tag === "a") {
  if (typeof props.target === "undefined") {
    target = isExternal ? "_blank" : props.target;
  } else {
    target = props.target;
  }
}

watchEffect(async () => {
  if (route.path !== prevPath) {
    prevPath = route.path;

    active.value = route.path === resolvedHref;
  }
});
</script>

<template>
  <component :is="tag" v-bind="bindProps" :target="target" :href="resolvedHref"
    :class="[active && 'active', className]">
    <slot />
  </component>
</template>
