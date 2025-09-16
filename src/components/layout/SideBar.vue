<script setup>
import { useData } from 'vitepress'
import { ref, watchEffect, inject } from 'vue'

import { SIDEBAR_WIDTH } from '../../constants.js'
import SideBarFooter from './SideBarFooter.vue'
import SideBarGroup from './SideBarGroup.vue'
import SideBarItems from './SideBarItems.vue'
import { Icon } from '@iconify/vue'
import SideBarTags from '../list/SideBarTags.vue'

const { theme, localeIndex } = useData()
const posts = inject('posts')
const props = defineProps(['isMobile'])
const animationTimeMs = 400
const drawerOpen = ref(!props.isMobile)
const animationLeftPx = ref(-SIDEBAR_WIDTH)
const backdropOpacity = ref(0)
let animationTimeout = null

const openDrawer = () => {
  if (!props.isMobile || drawerOpen.value) return

  drawerOpen.value = true

  setTimeout(() => {
    animationLeftPx.value = 0
    backdropOpacity.value = 1
  })
}

const closeDrawer = () => {
  if (!props.isMobile || !drawerOpen.value) return

  animationLeftPx.value = -SIDEBAR_WIDTH
  backdropOpacity.value = 0

  clearTimeout(animationTimeout)

  animationTimeout = setTimeout(() => {
    drawerOpen.value = false
    animationTimeout = null
  }, animationTimeMs)
}

defineExpose({
  openDrawer,
  handleLeftSwipe() {
    if (props.isMobile) closeDrawer()
  },
})

watchEffect(async () => {
  drawerOpen.value = !props.isMobile
})
</script>

<template>
  <div :class="{ hidden: !drawerOpen }">
    <div
      :style="{
        left: props.isMobile ? `${animationLeftPx}px` : '0',
        'transition-duration': `${animationTimeMs}ms`,
        width: `${SIDEBAR_WIDTH}px`,
      }"
      class="max-lg:overflow-y-auto max-lg:overflow-x-clip max-lg:fixed lg:h-fit transition-left app-drawer"
    >
      <div>
        <a
          v-if="theme.sidebarLogoSrc"
          :href="`/${localeIndex}/`"
          class="sidebar-logo"
          :title="theme.t.toHome"
        >
          <img
            :src="theme.sidebarLogoSrc"
            loading="lazy"
            width="320"
            height="158"
            aria-hidden="true"
          />
        </a>
        <h4 v-if="theme.siteTitle" class="sidebar-site-title text-sm muted">
          <a :href="`/${localeIndex}/`" :title="theme.t.toHome">
            {{ theme.siteTitle }}
          </a>
        </h4>

        <div class="sidebar-menu">
          <slot name="sidebar-top" />

          <SideBarGroup v-if="theme.sideBar?.links">
            <SideBarItems
              @click="closeDrawer"
              :items="theme.sideBar.links"
              :isMobile="props.isMobile"
            />
          </SideBarGroup>

          <SideBarTags :allPosts="posts[localeIndex]" />

          <slot name="sidebar-middle" />

          <SideBarGroup v-if="theme.sideBar?.bottomLinks" class="mt-2">
            <SideBarItems
              @click="closeDrawer"
              :items="theme.sideBar.bottomLinks"
              :isMobile="props.isMobile"
            />
          </SideBarGroup>

          <slot name="sidebar-bottom" />
        </div>
      </div>

      <SideBarFooter @click="closeDrawer" class="lg:hidden" />

      <div class="sidebar-gradient max-lg:hidden" aria-hidden="true">
        <div></div>
      </div>
    </div>
    <div
      @click="closeDrawer"
      :style="{
        opacity: backdropOpacity,
        'transition-duration': `${animationTimeMs}ms`,
      }"
      class="transition-opacity lg:hidden app-drawer-backdrop"
    >
      <div class="sidebar-closebtn-wrapper">
        <button
          @click.prevent.stop="closeDrawer"
          :title="theme.t.closeMenu"
          class="py-6 px-6 cursor-pointer text-gray-300 hover:text-white"
        >
          <Icon icon="fa6-solid:xmark" class="text-2xl" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.app-drawer {
  border-right: 1px solid var(--drawer-border-color);
  background: var(--drawer-bg);
  box-sizing: content-box;
  z-index: 10;
  top: 0;
  bottom: 0;
}

.dark .app-drawer {
  background: var(--drawer-dark-bg);
  border-right-color: var(--drawer-dark-border-color);
}

.app-drawer-backdrop {
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
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}

.dark .sidebar-gradient div {
  background: rgb(17, 24, 39);
  background: linear-gradient(
    0deg,
    var(--gray-900) 0%,
    var(--gray-900-trans) 100%
  );
}

.sidebar-menu {
  padding-top: 0.25rem;
}

.sidebar-logo {
  display: block;
}

.sidebar-site-title {
  font-weight: bold;
  padding: 0.35rem 0.25rem 0.75rem 0.65rem;
}
</style>
