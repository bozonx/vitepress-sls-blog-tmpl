<script setup>
import { useData } from 'vitepress'
import { Icon } from '@iconify/vue'
import SideBarGroup from './SideBarGroup.vue'
import SideBarLinks from './SideBarLinks.vue'

const { theme } = useData()
</script>

<template>
<div class="flex justify-end w-full absolute lg:hidden py-2 px-1">
  <Icon icon="fa6-solid:xmark" />
  <!-- <CloseButton id="sidebar-drawer-switch" class="dark:text-gray-700 dark:hover:text-gray-300" /> -->
</div>

<!-- <SidebarLogo class="dark:mb-4" /> -->

<div class="w-auto">
  <div class="!p-0 rounded-none">

    <slot name="sidebar-top" />

    <SideBarGroup v-if="theme.ui.sideBar?.topLinks">
      <SideBarLinks :items="theme.ui.sideBar.toplinks" />
    </SideBarGroup>
    
    <slot name="sidebar-middle" />

    <SideBarGroup v-if="theme.ui.sideBar?.bottomLinks">
      <SideBarLinks :items="theme.ui.sideBar.bottomLinks" />
    </SideBarGroup>

    <slot name="sidebar-bottom" />

  </div>
</div>

</template>

