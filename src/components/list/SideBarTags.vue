<script setup>
import { useData } from 'vitepress'
import SideBarHeader from '../layout/SideBarHeader.vue'

const { theme } = useData()
</script>

<template>
<SideBarHeader :text="theme.t.tags" />

<a href="">{{theme.t.links.allTags}}</a>
</template>

<!-- <SidebarDropdownWrapper label={$t('layout.tags')} isOpen={true} class="rounded-none"> -->
      <!--   <svelte:fragment slot="icon"> -->
      <!--     <TagSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /> -->
      <!--   </svelte:fragment> -->
      <!--   <svelte:fragment slot="arrowup"> -->
      <!--     <ChevronDoubleUpOutline class="w-3 h-3" /> -->
      <!--   </svelte:fragment> -->
      <!--   <svelte:fragment slot="arrowdown"> -->
      <!--     <ChevronDoubleDownOutline class="w-3 h-3" /> -->
      <!--   </svelte:fragment> -->
      <!---->
      <!--   <TagList class="ml-2" tags={allTags} /> -->
      <!-- </SidebarDropdownWrapper> -->
