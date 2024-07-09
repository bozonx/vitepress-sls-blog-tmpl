<script setup>
import { ref, watchEffect } from "vue";
import VPSwitchAppearance from "vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue";
import { useData } from "vitepress";
import Btn from "../Btn.vue";
import SwitchLang from "./SwitchLang.vue";
import { MOBILE_BREAKPOINT } from "../../constants.js";

const { theme } = useData();
const props = defineProps(["scrollY", "isMobile"]);
// const isMobile = ref(props.windowWidth <= MOBILE_BREAKPOINT);

watchEffect(async () => {
  // isMobile.value = props.windowWidth <= MOBILE_BREAKPOINT;
  // drawerOpen.value = !isMobile.value;
});
</script>

<template>
  <nav
    :class="[
      'flex w-full py-2 px-2 space-x-1',
      props.isMobile && 'topbar--mobile',
    ]"
  >
    <div class="flex-1 flex">
      <!-- for mobile -->
      <Btn
        @click="$emit('toggleSidebar')"
        id="topbar-drawer-switch"
        icon="fa6-solid:bars"
        class="lg:hidden topbar-item"
        :text="theme.t.sidebarMenuLabel"
      />
    </div>

    <!-- for mobile -->

    <ul v-if="theme.ui.topBar.mobileLinks" class="flex lg:hidden space-x-1">
      <li v-for="item in theme.ui.topBar.mobileLinks">
        <Btn
          :href="item.href"
          :icon="item.icon"
          :text="item.text"
          class="topbar-item"
        />
      </li>
    </ul>

    <!-- for desktop -->

    <ul v-if="theme.ui.topBar.links" class="flex max-lg:hidden space-x-1">
      <li v-for="item in theme.ui.topBar.links">
        <Btn
          :href="item.href"
          :icon="item.icon"
          :text="item.text"
          class="topbar-item"
        />
      </li>
    </ul>

    <div class="max-lg:hidden">
      <SwitchLang />
    </div>

    <div class="px-4 py-2 max-lg:hidden">
      <VPSwitchAppearance />
    </div>

    <ul v-if="theme.ui.topBar.socialLinks" class="flex max-lg:hidden space-x-1">
      <li v-for="item in theme.ui.topBar.socialLinks">
        <Btn :href="item.href" :icon="item.icon" />
      </li>
    </ul>
  </nav>
</template>

<style>
.topbar--mobile {
  display: flex;
  position: fixed;
  z-index: 1;
}

.dark .topbar--mobile {
  background: var(--topbar-mobile-dark-bg);
  border-bottom: 1px solid var(--topbar-mobile-dark-border);
}

.topbar-item {
  padding-left: 0.7rem;
  padding-right: 0.7rem;
}
</style>
