<script setup>
import { Icon } from "@iconify/vue";
import { useData } from "vitepress";

const props = defineProps(["scrollY"]);
const { theme } = useData();
const wrapperClassName =
  "bottom-0 fixed max-lg:hidden transition-opacity duration-1000";
const className =
  "mb-9 ml-4 flex gap-x-2 px-2 py-2 cursor-pointer text-gray-600 hover:text-black " +
  "dark:text-gray-300 dark:hover:text-white ";
const DESKTOP_BREAKPOINT = 1080;
const handleClick = () => {
  window.scrollTo(0, 0);
};
</script>

<template>
  <div :class="wrapperClassName" :style="{ opacity: props.scrollY > DESKTOP_BREAKPOINT ? 1 : 0 }" aria-hidden="true">
    <span :class="className" @click.prevent.stop="handleClick">
      <Icon icon="fa6-solid:arrow-up" />
      {{ theme.t.returnToTopLabel }}
    </span>
  </div>
</template>
