<script setup>
import { inBrowser, useData } from 'vitepress'
import { onMounted, onUnmounted, ref, watch, provide } from 'vue'

import BlogHomeLayout from './BlogHomeLayout.vue'
import PageContent from './components/PageContent.vue'
import Footer from './components/layout/Footer.vue'
import NotFound from './components/layout/NotFound.vue'
import SideBar from './components/layout/SideBar.vue'
import ToTheTop from './components/layout/ToTheTop.vue'
import TopBar from './components/layout/TopBar.vue'
import { MOBILE_BREAKPOINT, SWIPE_OFFSET } from './constants.js'
import { isHomePage } from './helpers/helpers.js'
import { usePosts } from './composables/usePosts.js'

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
let touchEndListener

const props = defineProps(['posts'])

// Инициализируем composable для работы с постами
const { posts: reactivePosts, savePosts } = usePosts()

// Отслеживаем изменения в props.posts и сохраняем их реактивно
watch(
  () => props.posts,
  (newPosts) => {
    if (newPosts && newPosts.length > 0) {
      savePosts(newPosts)
      console.log(`Posts saved reactively: ${newPosts.length} posts`)
    }
  },
  { immediate: true, deep: true }
)

savePosts(props.posts)
// Предоставляем реактивные посты дочерним компонентам
provide('posts', reactivePosts)

function onOpenDrawer() {
  sidebarRef.value.openDrawer()
}

function startTouch(e) {
  // Обрабатываем жесты только на мобильных устройствах
  if (!isMobile.value) return

  const touchX = e.touches[0].clientX

  // Для открытия меню свайпом вправо - обрабатываем только касания с левого края экрана
  // Для закрытия меню свайпом влево - обрабатываем любые касания
  if (touchX > 50) {
    // Если касание не с левого края, обрабатываем только для закрытия меню
    touchInitialX.value = e.touches[0].clientX
    touchInitialY.value = e.touches[0].clientY
  } else {
    // Если касание с левого края - обрабатываем для открытия и закрытия
    touchInitialX.value = e.touches[0].clientX
    touchInitialY.value = e.touches[0].clientY
  }
}

function moveTouch(e) {
  // Обрабатываем жесты только на мобильных устройствах
  if (!isMobile.value) return

  if (touchInitialX.value === null) {
    return
  }

  const currentX = e.touches[0].clientX
  const currentY = e.touches[0].clientY
  const dx = currentX - touchInitialX.value
  const dy = currentY - touchInitialY.value

  // Проверяем, что движение достаточно горизонтальное (не вертикальное)
  if (Math.abs(dy) > Math.abs(dx)) {
    touchInitialX.value = null
    touchInitialY.value = null
    return
  }

  if (Math.abs(dx) < SWIPE_OFFSET) {
    return
  }

  // Определяем направление свайпа
  if (dx > 0) {
    // Свайп вправо - открываем меню только если начали с левого края
    if (touchInitialX.value <= 50 && sidebarRef.value) {
      // Предотвращаем прокрутку страницы только при успешном свайпе для открытия меню
      e.preventDefault()
      sidebarRef.value.openDrawer()
    }
  } else {
    // Свайп влево - закрываем меню
    if (sidebarRef.value) {
      // Предотвращаем прокрутку страницы только при успешном свайпе для закрытия меню
      e.preventDefault()
      sidebarRef.value.handleLeftSwipe()
    }
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

  touchStartListener = window.addEventListener('touchstart', startTouch, {
    passive: false,
  })
  touchMoveListener = window.addEventListener('touchmove', moveTouch, {
    passive: false,
  })
  touchEndListener = window.addEventListener(
    'touchend',
    () => {
      touchInitialX.value = null
      touchInitialY.value = null
    },
    { passive: false }
  )
})
onUnmounted(() => {
  if (!inBrowser) return

  window.removeEventListener('resize', resizeListener)
  window.removeEventListener('scroll', scrollListener)
  window.removeEventListener('touchstart', touchStartListener)
  window.removeEventListener('touchmove', touchMoveListener)
  window.removeEventListener('touchend', touchEndListener)
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
