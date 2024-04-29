<script setup>
import VPSwitchAppearance from 'vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue'
import { useData } from 'vitepress'
import TopBarLink from './TopBarLink.vue'
import SwitchLang from './SwitchLang.vue'

const { theme } = useData()
</script>

<template>
<div class="flex w-full py-2 px-2">
	<div class="flex-1 flex">
		<!-- for mobile -->
		<TopBarLink
			@click="$emit('toggleSidebar')"
			id="topbar-drawer-switch"
			icon="fa6-solid:bars"
			class="lg:hidden"
			:text="theme.sidebarMenuLabel"
		/>
	</div>

  <!-- for mobile -->

	<ul v-if="theme.ui.topBar.mobileLinks" class="flex lg:hidden">
		<li v-for="item in theme.ui.topBar.mobileLinks">
			<TopBarLink :href="item.href" :icon="item.icon" :text="item.text" />
		</li>
	</ul>

	<!-- for desktop -->

	<ul v-if="theme.ui.topBar.links" class="flex max-lg:hidden">
		<li v-for="item in theme.ui.topBar.links">
			<TopBarLink :href="item.href" :icon="item.icon" :text="item.text" />
		</li>
	</ul>
  
  <div class="px-4 max-lg:hidden">
  	<SwitchLang />
  </div>

  <div class="px-4 py-2 max-lg:hidden">
  	<VPSwitchAppearance />
  </div>

	<ul v-if="theme.ui.topBar.socialLinks" class="flex max-lg:hidden">
		<li v-for="item in theme.ui.topBar.socialLinks">
			<TopBarLink :href="item.href" :icon="item.icon" />
		</li>
	</ul>
</div>
</template>

