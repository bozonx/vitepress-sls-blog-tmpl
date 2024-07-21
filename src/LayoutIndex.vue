<script setup>
import { useData } from "vitepress";
import { onMounted, onUnmounted, ref } from "vue";
import SideBar from "./components/layout/SideBar.vue";
import Footer from "./components/layout/Footer.vue";
import PageContent from "./components/PageContent.vue";
import TopBar from "./components/layout/TopBar.vue";
import ToTheTop from "./components/layout/ToTheTop.vue";
import NotFound from "./components/layout/NotFound.vue";
import SwitchLang from "./components/layout/SwitchLang.vue";
import { MOBILE_BREAKPOINT, SWIPE_OFFSET } from "./constants.js";

const { page, theme, frontmatter } = useData();
const windowWidth = ref(0);
const isMobile = ref(true);
const scrollY = ref(0);
const touchInitialX = ref(null);
const touchInitialY = ref(null);
const sidebarRef = ref(null);
let resizeListener;
let scrollListener;
let touchStartListener;
let touchMoveListener;

function onSidebarToggle() {
  sidebarRef.value.toggleSidebar();
}

function startTouch(e) {
  touchInitialX.value = e.touches[0].clientX;
  touchInitialY.value = e.touches[0].clientY;
}

function moveTouch(e) {
  if (touchInitialX.value === null) {
    return;
  }

  const currentX = e.touches[0].clientX;
  const currentY = e.touches[0].clientY;
  const dx = currentX - touchInitialX.value;
  const dy = currentY - touchInitialY.value;
  const rad = Math.atan2(dy, dx); // Получаем угол в радианах
  const deg = rad * (180 / Math.PI); // Преобразуем радианы в градусы
  const deg360 = deg + 180;

  if (!(deg360 < SWIPE_OFFSET || deg360 > 360 - SWIPE_OFFSET)) {
    touchInitialX.value = null;
    touchInitialY.value = null;

    return;
  }

  const diffX = touchInitialX.value - currentX;

  if (diffX > 0) {
    sidebarRef.value.handleLeftSwipe();
  }

  touchInitialX.value = null;
  touchInitialY.value = null;
}

onMounted(() => {
  windowWidth.value = window.innerWidth;
  isMobile.value = windowWidth.value < MOBILE_BREAKPOINT;

  resizeListener = window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
    isMobile.value = windowWidth.value < MOBILE_BREAKPOINT;
  });

  scrollListener = window.addEventListener("scroll", () => {
    scrollY.value = window.scrollY;
  });

  touchStartListener = window.addEventListener("touchstart", startTouch, false);
  touchMoveListener = window.addEventListener("touchmove", moveTouch, false);
});
onUnmounted(() => {
  window.removeEventListener("resize", resizeListener);
  window.removeEventListener("scroll", scrollListener);
  window.removeEventListener("touchstart", touchStartListener);
  window.removeEventListener("touchmove", touchMoveListener);
});
</script>

<template>
  <div v-if="page.isNotFound">
    <NotFound />
  </div>
  <Content v-else-if="frontmatter.layout === false" />
  <div v-else-if="frontmatter.layout === 'home'" class="home-layout">
    <div class="home-layout-topbar">
      <SwitchLang dropLeft="true" onlyDark="true" noBg="true" />
    </div>
    <div class="home-layout-page">
      <Content />
    </div>
  </div>
  <div v-else class="min-h-screen lg:flex w-full">
    <!--  left col-->
    <SideBar ref="sidebarRef" :isMobile="isMobile">
      <template #sidebar-logo>
        <slot name="sidebar-logo" />
      </template>
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
        <TopBar @toggle-sidebar="onSidebarToggle" :isMobile="isMobile" />
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

<style>
.app-page {
  width: 100%;
  max-width: var(--page-max-width);
}

/* @media (min-width: 1200px) { */
/*   .app-page { */
/*     width: 840px; */
/*   } */
/* } */

.home-layout {
  display: flex;
  flex-flow: column;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
}

.home-layout {
  color: white !important;
}

.home-layout-topbar {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem 1.5rem 0 0;
}

.home-layout-page {
  max-width: 800px;
  margin: 5rem 1rem;
}
</style>
