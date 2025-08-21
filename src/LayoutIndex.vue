<script setup>
import { inBrowser, useData } from 'vitepress'
import { onMounted, onUnmounted, ref } from 'vue'

import BlogHomeLayout from './BlogHomeLayout.vue'
import PageContent from './components/PageContent.vue'
import Footer from './components/layout/Footer.vue'
import NotFound from './components/layout/NotFound.vue'
import SideBar from './components/layout/SideBar.vue'
import ToTheTop from './components/layout/ToTheTop.vue'
import TopBar from './components/layout/TopBar.vue'
import { MOBILE_BREAKPOINT, SWIPE_OFFSET } from './constants.js'
import { isHomePage } from './helpers/helpers.js'

const { page, theme, frontmatter } = useData()
const windowWidth = ref(0)
const isMobile = ref(true)
const scrollY = ref(0)
const touchInitialX = ref(null)
const touchInitialY = ref(null)
const sidebarRef = ref(null)
let resizeListener
let scrollListener
let touchStartListener
let touchMoveListener

function onOpenDrawer() {
  sidebarRef.value.openDrawer()
}

function startTouch(e) {
  touchInitialX.value = e.touches[0].clientX
  touchInitialY.value = e.touches[0].clientY
}

function moveTouch(e) {
  if (touchInitialX.value === null) {
    return
  }

  const currentX = e.touches[0].clientX
  const currentY = e.touches[0].clientY
  const dx = currentX - touchInitialX.value
  const dy = currentY - touchInitialY.value
  const rad = Math.atan2(dy, dx) // Получаем угол в радианах
  const deg = rad * (180 / Math.PI) // Преобразуем радианы в градусы
  const deg360 = deg + 180

  if (!(deg360 < SWIPE_OFFSET || deg360 > 360 - SWIPE_OFFSET)) {
    touchInitialX.value = null
    touchInitialY.value = null

    return
  }

  const diffX = touchInitialX.value - currentX

  if (diffX > 0) {
    sidebarRef.value.handleLeftSwipe()
  }

  touchInitialX.value = null
  touchInitialY.value = null
}

onMounted(() => {
  if (!inBrowser) return

  windowWidth.value = window.innerWidth
  isMobile.value = windowWidth.value < MOBILE_BREAKPOINT

  resizeListener = window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
    isMobile.value = windowWidth.value < MOBILE_BREAKPOINT
  })

  scrollListener = window.addEventListener('scroll', () => {
    scrollY.value = window.scrollY
  })

  touchStartListener = window.addEventListener('touchstart', startTouch, false)
  touchMoveListener = window.addEventListener('touchmove', moveTouch, false)
})
onUnmounted(() => {
  if (!inBrowser) return

  window.removeEventListener('resize', resizeListener)
  window.removeEventListener('scroll', scrollListener)
  window.removeEventListener('touchstart', touchStartListener)
  window.removeEventListener('touchmove', touchMoveListener)
})
</script>

<template>
  <div v-if="page.isNotFound">
    <NotFound />
  </div>

  <Content v-else-if="frontmatter.layout === false" />

  <BlogHomeLayout v-else-if="isHomePage(frontmatter)" :scrollY="scrollY" />

  <!-- This is default layout -->
  <div v-else class="min-h-screen lg:flex w-full">
    <!--  left col-->
    <SideBar ref="sidebarRef" :isMobile="isMobile">
      <template #sidebar-top>
        <slot name="sidebar-top" />
      </template>
      <template #sidebar-middle>
        <slot name="sidebar-middle" />
      </template>
      <template #sidebar-bottom>
        <slot name="sidebar-bottom" />
      </template>
    </SideBar>
    <!-- right col-->
    <div class="flex-1">
      <header>
        <TopBar @open-drawer="onOpenDrawer" :isMobile="isMobile" />
      </header>

      <div :class="['flex']">
        <main class="lg:ml-4 xl:ml-24 mt-20 lg:mt-4 px-4 sm:px-8 app-page">
          <PageContent />

          <div class="mt-40 pb-12">
            <Footer>
              <template #footer-before>
                <slot name="footer-before" />
              </template>
            </Footer>
          </div>
        </main>

        <aside v-if="theme.aside" class="max-xl:hidden">
          <slot name="aside" />
        </aside>
      </div>
    </div>

    <ToTheTop :scrollY="scrollY" :isMobile="isMobile" />
  </div>
</template>

<style scoped>
.app-page {
  width: 100%;
  max-width: var(--page-max-width);
}
</style>
