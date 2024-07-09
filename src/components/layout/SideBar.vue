<script setup>
import { ref, watchEffect } from "vue";
import { useData } from "vitepress";
import { Icon } from "@iconify/vue";
import SideBarGroup from "./SideBarGroup.vue";
import SideBarItems from "./SideBarItems.vue";
import SideBarFooter from "./SideBarFooter.vue";
import { SIDEBAR_WIDTH } from "../../constants.js";

const { theme } = useData();
const props = defineProps(["isMobile"]);
const drawerOpen = ref(!props.isMobile);
const positionX = ref(0);
const backdropOpacity = ref(0);
let animationTimeout = null;
const animationTimeMs = 400;

const openDrawer = () => {
  if (!props.isMobile || drawerOpen.value) return;

  drawerOpen.value = true;

  setTimeout(() => {
    positionX.value = 0;
    backdropOpacity.value = 1;
  });
};
const closeDrawer = () => {
  if (!props.isMobile || !drawerOpen.value) return;

  positionX.value = -SIDEBAR_WIDTH;
  backdropOpacity.value = 0;

  clearTimeout(animationTimeout);

  animationTimeout = setTimeout(() => {
    drawerOpen.value = false;
    animationTimeout = null;
  }, animationTimeMs);
};

defineExpose({
  toggleSidebar() {
    openDrawer();
  },
});

watchEffect(async () => {
  drawerOpen.value = !props.isMobile;
});
</script>

<template>
  <div :class="{ hidden: !drawerOpen }">
    <div id="app-drawer" :style="{
      left: `${positionX}px`,
      'transition-duration': `${animationTimeMs}ms`,
      width: `${SIDEBAR_WIDTH}px`,
    }" class="max-lg:overflow-y-auto max-lg:overflow-x-clip max-lg:fixed lg:h-fit transition-left">
      <div>
        <div class="sidebar-closebtn-wrapper lg:hidden">
          <div @click.prevent.stop="closeDrawer" class="mr-5 mt-3">
            <Icon icon="fa6-solid:xmark" id="sidebar-drawer-switch"
              class="dark:text-gray-700 dark:hover:text-gray-300" />
          </div>
        </div>

        <!-- <SidebarLogo class="dark:mb-4" /> -->

        <div>
          <slot name="sidebar-top" />

          <SideBarGroup v-if="theme.ui.sideBar?.topLinks">
            <SideBarItems @click="closeDrawer" :items="theme.ui.sideBar.topLinks" :isMobile="isMobile" />
          </SideBarGroup>

          <slot name="sidebar-middle" />

          <SideBarGroup v-if="theme.ui.sideBar?.bottomLinks" class="mt-2">
            <SideBarItems @click="closeDrawer" :items="theme.ui.sideBar.bottomLinks" :isMobile="isMobile" />
          </SideBarGroup>

          <slot name="sidebar-bottom" />
        </div>
      </div>

      <SideBarFooter @click="closeDrawer" class="lg:hidden" />

      <div class="sidebar-gradient max-lg:hidden" aria-hidden="true">
        <div></div>
      </div>
    </div>
    <div @click="closeDrawer" id="app-drawer-backdrop" :style="{
      opacity: backdropOpacity,
      'transition-duration': `${animationTimeMs}ms`,
    }" class="transition-opacity lg:hidden"></div>
  </div>
</template>

<style>
#app-drawer {
  border-right: 1px solid var(--drawer-border-color);
  background: var(--drawer-bg);
  box-sizing: content-box;
  z-index: 10;
  top: 0;
  bottom: 0;
}

.dark #app-drawer {
  background: var(--dark-drawer-bg);
  border-right-color: var(--dark-drawer-border-color);
}

#app-drawer-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--backdrop-bg);
  z-index: 9;
  cursor: pointer;
}

.sidebar-closebtn-wrapper {
  position: absolute;
  height: 0;
  right: 0;
}

.sidebar-gradient {
  width: 100%;
  position: relative;
  height: 200px;
}

.sidebar-gradient div {
  width: calc(100% + 1px);
  height: 200px;
  position: absolute;
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%);
}

.dark .sidebar-gradient div {
  background: rgb(17, 24, 39);
  background: linear-gradient(0deg,
      rgba(17, 24, 39, 1) 0%,
      rgba(17, 24, 39, 0) 100%);
}
</style>
