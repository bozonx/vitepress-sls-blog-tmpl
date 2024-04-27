<script setup>
import { useData } from 'vitepress'
import { Icon } from '@iconify/vue'
import VPSwitchAppearance from 'vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue'
import SwitchLang from './SwitchLang.vue'

const props = defineProps(['class'])
const { theme } = useData()
</script>

<template>

<!-- <slot name="sidebar-footer" /> -->

<div :class="['w-full flex justify-end items-end pt-10 pb-3 pr-2 space-x-1', props.class]">
  <div class="px-4">
  	<SwitchLang />
  </div>

  <div class="px-4 py-2">
  	<VPSwitchAppearance />
  </div>

  <ul v-if="theme.ui.topBar.socialLinks" class="flex">
		<li v-for="item in theme.ui.topBar.socialLinks">
      <a
        :href="item.href"
        target="_blank"
        class="px-3 py-3 flex rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        <Icon :icon="item.icon" class="text-gray-500 dark:text-gray-400"/>
      </a>
		</li>
	</ul>
</div>
</template>

