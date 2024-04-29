<script setup>
import {ref, watchEffect} from 'vue'
import { useData } from 'vitepress'
import { Icon } from '@iconify/vue'
import SideBarGroup from './SideBarGroup.vue'
import SideBarItems from './SideBarItems.vue'
import SideBarFooter from './SideBarFooter.vue'
import { MOBILE_BREAKPOINT } from '../../constants.js'

const { theme } = useData()
const props = defineProps(['windowWidth'])
const isMobile = ref(props.windowWidth <= MOBILE_BREAKPOINT)
const drawerOpen = ref(!isMobile.value)

const closeDrawer = () => {
  console.log(555)
  if (isMobile.value) drawerOpen.value = false
}

defineExpose({
  toggleSidebar() {
    drawerOpen.value = !drawerOpen.value
  }
})

watchEffect(async () => {
  isMobile.value = props.windowWidth <= MOBILE_BREAKPOINT
  drawerOpen.value = !isMobile.value
})
</script>

<template>
<div :class="{hidden: !drawerOpen}">
  <div
    id="app-drawer"
    class="max-lg:overflow-y-auto max-lg:overflow-x-clip max-lg:fixed lg:h-fit"
  >
    <div>
      <div class="flex justify-end w-full absolute lg:hidden py-2 px-1">
        <div @click.prevent.stop="drawerOpen = false">
          <Icon icon="fa6-solid:xmark" id="sidebar-drawer-switch" class="dark:text-gray-700 dark:hover:text-gray-300" />
        </div>
      </div>

      <!-- <SidebarLogo class="dark:mb-4" /> -->

      <div>

        <slot name="sidebar-top" />

        <SideBarGroup v-if="theme.ui.sideBar?.topLinks">
          <SideBarItems
            @click="closeDrawer"
            :items="theme.ui.sideBar.topLinks"
            :isMobile="isMobile"
          />
        </SideBarGroup>
        
        <slot name="sidebar-middle" />

        <SideBarGroup v-if="theme.ui.sideBar?.bottomLinks" class="mt-2">
          <SideBarItems
            @click="closeDrawer"
            :items="theme.ui.sideBar.bottomLinks"
            :isMobile="isMobile"
          />
        </SideBarGroup>

        <slot name="sidebar-bottom" />

      </div>
    </div>

    <SideBarFooter @click="closeDrawer" class="lg:hidden " />

    <div class="sidebar-gradient max-lg:hidden" aria-hidden="true"><div></div></div>
  </div>
  <div @click="closeDrawer" id="app-drawer-backdrop" class="lg:hidden"></div>
</div>

</template>

