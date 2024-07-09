<script setup>
import { Icon } from "@iconify/vue";
import { useData } from "vitepress";
import { ref, watchEffect } from "vue";

const props = defineProps(["scrollY"]);
const SCROLL_BREAKPOINT = 1080;
const animationTimeMs = 1000;
const { theme } = useData();
let showed = ref(false);
let opacity = ref(0);
let animationTimeout = null;
const className =
  "mb-9 ml-4 flex gap-x-2 px-2 py-2 cursor-pointer text-gray-600 hover:text-black " +
  "dark:text-gray-300 dark:hover:text-white ";
const show = () => {
  if (showed.value) return;

  showed.value = true;

  setTimeout(() => (opacity.value = 1));
};
const hide = () => {
  if (!showed.value) return;

  opacity.value = 0;

  clearTimeout(animationTimeout);

  animationTimeout = setTimeout(() => {
    showed.value = false;

    animationTimeout = null;
  }, animationTimeMs);
};
const handleClick = () => {
  window.scrollTo(0, 0);
};

watchEffect(async () => {
  if (props.scrollY > SCROLL_BREAKPOINT) {
    show();
  } else {
    hide();
  }
});
</script>

<template>
  <div :class="['bottom-0 fixed transition-opacity', !showed && 'hidden']"
    :style="{ opacity, 'transition-duration': `${animationTimeMs}ms` }" aria-hidden="true">
    <a :class="className" @click.prevent.stop="handleClick">
      <Icon icon="fa6-solid:arrow-up" />
      {{ theme.t.returnToTopLabel }}
    </a>
  </div>
</template>
