<script setup>
import { ref, watchEffect } from "vue";
import { useData } from "vitepress";
import Btn from "../Btn.vue";
import SwitchLang from "./SwitchLang.vue";
import SwitchAppearance from "./SwitchAppearance.vue";

const { theme } = useData();
const props = defineProps(["isMobile"]);
const resolveItemShowClass = (item) => {
  if (item.mobileToo) return "";
  else if (item.mobileOnly) return "lg:hidden";
  // desktop only
  return "max-lg:hidden";
};
</script>

<template>
  <nav :class="[
    'flex w-full py-2 px-2 gap-x-1 top-bar',
    props.isMobile && 'topbar--mobile',
  ]">
    <div class="flex-1 flex">
      <!-- for mobile -->
      <Btn @click="$emit('toggleSidebar')" icon="fa6-solid:bars" noBg="true" class="lg:hidden topbar-item"
        iconClass="muted" :text="theme.sidebarMenuLabel" />
    </div>

    <ul v-if="theme.topBar.links" class="flex space-x-1">
      <li v-for="item in theme.topBar.links" :class="resolveItemShowClass(item)">
        <Btn v-bind="item" noBg="true" class="topbar-item" iconClass="muted" />
      </li>
    </ul>

    <div class="max-lg:hidden">
      <SwitchLang noBg="true" />
    </div>

    <div class="max-lg:hidden" aria-hidden="true">
      <SwitchAppearance />
    </div>

    <ul v-if="theme.socialLinks" class="flex max-lg:hidden space-x-1">
      <li v-for="item in theme.socialLinks">
        <Btn noBg="true" v-bind="item" />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.topbar--mobile {
  display: flex;
  position: fixed;
  z-index: 1;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.07);
  background: var(--topbar-mobile-bg);
  border-bottom: 1px solid var(--topbar-mobile-border);
}

.dark .topbar--mobile {
  background: var(--topbar-mobile-dark-bg);
  border-color: var(--topbar-mobile-dark-border);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
}

.topbar-item {
  padding-left: 0.7rem;
  padding-right: 0.7rem;
}
</style>
