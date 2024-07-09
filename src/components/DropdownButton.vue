<script setup>
import { ref } from "vue";
import { vOnClickOutside } from "@vueuse/components";
import { Icon } from "@iconify/vue";
import Btn from "./Btn.vue";

const props = defineProps(["dropUp", "label"]);
const animationTimeMs = 400;
let listOpen = ref(false);
let opacity = ref(0);
let animationTimeout = null;
const toggleList = () => {
  if (listOpen.value) {
    //close
    closeList();
  } else {
    // open
    listOpen.value = !listOpen.value;

    setTimeout(() => (opacity.value = Number(listOpen.value)));
  }
};
const closeList = () => {
  if (!listOpen.value) return;

  opacity.value = 0;

  clearTimeout(animationTimeout);

  animationTimeout = setTimeout(() => {
    listOpen.value = false;

    animationTimeout = null;
  }, animationTimeMs);
};
</script>

<template>
  <div class="dropdown-btn">
    <Btn @click.prevent.stop="toggleList" :label="props.label">
      <span class="flex">
        <slot name="btn-text" />
        <span class="dropdown-caret">
          <Icon :class="[listOpen && 'hidden']" icon="ci:caret-down-md" width="1.7rem" height="1.7rem" />
          <Icon :class="[!listOpen && 'hidden']" icon="ci:caret-up-md" width="1.7rem" height="1.7rem" />
        </span>
      </span>
    </Btn>
    <div @click="closeList" v-on-click-outside="closeList" :style="{
      opacity,
      'transition-duration': `${animationTimeMs}ms`,
    }" :class="[
        `dropdown-list space-y-1 transition-opacity`,
        props.dropUp && 'dropdown--drop-up',
        !listOpen && 'hidden',
      ]">
      <slot />
    </div>
  </div>
</template>

<style>
.dropdown-btn {
  display: inline-block;
  position: relative;
}

.dropdown-caret {
  margin-left: 0.25rem;
  margin-right: -10px;
}

.dropdown-list {
  position: absolute;
  z-index: 100;
  /* min-width: 150px; */
  padding: 0.4rem 0;
  border-radius: 0.5rem;
  background: var(--dropdown-list-bg);
  border: 1px solid var(--dropdown-list-border-color);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.3);
}

.dark .dropdown-list {
  background: var(--dropdown-list-dark-bg);
  border: 1px solid var(--dropdown-list-dark-border-color);
}

.dropdown--drop-up {
  bottom: 100%;
}
</style>
