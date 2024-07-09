<script setup>
import { useData } from "vitepress";
import { onMounted, onUnmounted, ref } from "vue";
import SideBar from "./components/layout/SideBar.vue";
import Footer from "./components/layout/Footer.vue";
import PageContent from "./components/PageContent.vue";
import TopBar from "./components/layout/TopBar.vue";
import ToTheTop from "./components/layout/ToTheTop.vue";
import NotFound from "./components/layout/NotFound.vue";

const { page, theme, frontmatter } = useData();
let windowWidth = ref(0);
let scrollY = ref(0);
let resizeListener;
let scrollListener;
const sidebarRef = ref(null);

function onSidebarToggle() {
  sidebarRef.value.toggleSidebar();
}

onMounted(() => {
  windowWidth.value = window.innerWidth;

  resizeListener = window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
  });

  scrollListener = window.addEventListener("scroll", () => {
    scrollY.value = window.scrollY;
  });
});
onUnmounted(() => {
  window.removeEventListener("resize", resizeListener);
  window.removeEventListener("resize", scrollListener);
});
</script>

<template>
  <div v-if="page.isNotFound">
    <NotFound />
  </div>
  <Content v-else-if="frontmatter.layout === false" />
  <div v-else class="min-h-screen lg:flex w-full dark:bg-gray-900 text-gray-900 dark:text-gray-200 text-lg">
    <!--  left col-->
    <SideBar ref="sidebarRef" :windowWidth="windowWidth">
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
        <TopBar @toggle-sidebar="onSidebarToggle" />
      </header>

      <div class="flex">
        <main id="app-page" class="lg:ml-4 xl:ml-24 mt-4 px-4 sm:px-8">
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

    <ToTheTop :scrollY="scrollY" :windowWidth="windowWidth" />
  </div>
</template>
