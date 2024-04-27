<!-- <script setup>
  import { useData } from 'vitepress'
  const { page, frontmatter } = useData()
  </script>

  <template>
    <h1>Custom Layout!</h1>

    <div v-if="page.isNotFound">
      Custom 404 page!
    </div>
    <Content v-else />
  </template> -->

<script setup>
//import DefaultTheme from 'vitepress/theme'

//const { Layout } = DefaultTheme
import { useData, useRoute } from 'vitepress'
import { onMounted, onUnmounted, ref } from 'vue'
import SideBar from './components/layout/SideBar.vue'
import Footer from './components/layout/Footer.vue'
import PageContent from './components/PageContent.vue'
import TopBar from './components/layout/TopBar.vue'
import ToTheTop from './components/layout/ToTheTop.vue'
import NotFound from './components/layout/NotFound.vue'

const { page, theme } = useData()
let windowWidth = ref(0)
let windowListener
const sidebarRef = ref(null)

function onSidebarToggle() {
  sidebarRef.value.toggleSidebar()
}

onMounted(() => {
  windowWidth.value = window?.innerWidth
  
  windowListener = window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})
onUnmounted(() => window.removeEventListener('resize', windowListener))
</script>

<template>
<div class="min-h-screen lg:flex w-full dark:bg-gray-900 text-gray-900 dark:text-gray-200 text-lg">
  <!--  left col-->
  <SideBar ref="sidebarRef" :windowWidth="windowWidth">
    <template #sidebar-top><slot name="sidebar-top" /></template>
    <template #sidebar-middle><slot name="sidebar-middle" /></template>
    <template #sidebar-bottom><slot name="sidebar-bottom" /></template>
  </SideBar>
  <!-- right col-->
  <div class="flex-1">
    <header><TopBar @toggle-sidebar="onSidebarToggle" /></header>

    <div class="lg:flex justify-center">

      <main id="app-page" class="mt-4 px-4 sm:px-8">

        <div class="lg:hidden mb-6 text-center text-2xl text-gray-600 dark:text-gray-300">
          {{theme.siteTitle}}
        </div>

        <div v-if="page.isNotFound"><NotFound /></div>
        <PageContent v-else />

        <div class="mt-24 pb-8"><Footer /></div>
      </main>

    </div>
  </div>

  <div id="to-the-top" class="bottom-0 fixed mb-8 ml-4 max-lg:hidden hidden" aria-hidden="true">
    <span aria-hidden="true"><ToTheTop /></span>
  </div>

</div>
</template>

