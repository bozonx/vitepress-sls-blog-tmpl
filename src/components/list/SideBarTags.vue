<script setup>
import TagItem from '../TagItem.vue'
import { makeTagsList } from '../../helpers/listHelpers.js'

const props = defineProps(['allPosts', 'class'])
const tagList = makeTagsList(props.allPosts)
</script>

<template>
<!-- <TagsList :tags="tagList" :sizeXl="true" /> -->
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
