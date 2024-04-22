<script setup>
import { Icon } from '@iconify/vue'
import { useData } from 'vitepress'
import TopBarLink from './TopBarLink.vue'

const { theme, localeIndex } = useData()
</script>

<template>
<div class="flex w-full py-2 px-2">
	<div class="flex-1">
		<ul class="flex pl-1 pr-1">
			<li class="lg:hidden">
				<TopBarLink id="topbar-drawer-switch" icon="fa6-solid:bars" />
			</li>
		</ul>
	</div>

	<ul v-if="theme.ui.topBar.specialLinks" class="flex">
		<li v-for="item in theme.ui.topBar.specialLinks">
			<TopBarLink :href="item.href" :icon="item.icon" :text="item.text" />
		</li>
	</ul>

	<ul v-if="theme.ui.topBar.links" class="flex">
		<li v-for="item in theme.ui.topBar.links">
			<TopBarLink :href="item.href" :icon="item.icon" :text="item.text" />
		</li>
	</ul>
		<!-- <li class="max-lg:hidden"><SwitchLanguage /></li> -->
		<!-- <li class="max-lg:hidden"><DarkModeSwitch /></li> -->
	<ul v-if="theme.ui.topBar.socialLinks" class="flex">
		<li v-for="item in theme.ui.topBar.socialLinks">
			<TopBarLink :href="item.href" :icon="item.icon" />
		</li>
	</ul>
</div>
</template>

