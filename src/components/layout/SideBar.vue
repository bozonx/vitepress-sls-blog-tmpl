<script setup>
import { ref, watchEffect } from "vue";
import { useData } from "vitepress";
import { Icon } from "@iconify/vue";
import SideBarGroup from "./SideBarGroup.vue";
import SideBarItems from "./SideBarItems.vue";
import SideBarFooter from "./SideBarFooter.vue";
import { MOBILE_BREAKPOINT } from "../../constants.js";

const { theme } = useData();
const props = defineProps(["windowWidth"]);
const isMobile = ref(props.windowWidth <= MOBILE_BREAKPOINT);
const drawerOpen = ref(!isMobile.value);

const closeDrawer = () => {
  if (isMobile.value) drawerOpen.value = false;
};

defineExpose({
  toggleSidebar() {
    drawerOpen.value = !drawerOpen.value;
  },
});

watchEffect(async () => {
  isMobile.value = props.windowWidth <= MOBILE_BREAKPOINT;
  drawerOpen.value = !isMobile.value;
});
</script>

<template>
  <div :class="{ hidden: !drawerOpen }">
    <div id="app-drawer" class="max-lg:overflow-y-auto max-lg:overflow-x-clip max-lg:fixed lg:h-fit">
      <div>
        <div class="flex justify-end w-full absolute lg:hidden py-2 px-1">
          <div @click.prevent.stop="drawerOpen = false">
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
    <div @click="closeDrawer" id="app-drawer-backdrop" class="lg:hidden"></div>
  </div>
</template>

<style>
#app-drawer {
  width: 320px;
  border-right: 1px solid var(--drawer-border-color);
  box-sizing: content-box;
  background: var(--drawer-bg);
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
  background: var(--backdrop-bg: rgba);
  z-index: 9;
  cursor: pointer;
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
