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
import { useData } from 'vitepress'
import Footer from './components/layout/Footer.vue'
import SideBar from './components/layout/SideBar.vue'
import SideBarFooter from './components/layout/SideBarFooter.vue'
import ToTheTop from './components/layout/ToTheTop.vue'
import TopBar from './components/layout/TopBar.vue'
import NotFound from './components/layout/NotFound.vue'

const { page, theme } = useData()
</script>

<template>
<div class="min-h-screen lg:flex w-full dark:bg-gray-900 text-gray-900 dark:text-gray-200 text-lg">
  <!--  left col-->
  <div>
    <div
      id="app-drawer"
      class="w-80 lg:w-72 max-lg:overflow-y-auto max-lg:overflow-x-clip max-lg:fixed lg:h-fit"
    >
      <div><SideBar /></div>

      <SideBarFooter class="lg:hidden" />

      <div class="sidebar-gradient max-lg:hidden" aria-hidden="true"><div></div></div>
    </div>
    <div id="app-drawer-backdrop" class="hidden"></div>
  </div>
  <!-- right col-->
  <div class="flex-1">
    <header><TopBar /></header>

    <div class="lg:flex justify-center">

      <main id="app-page" class="mt-4 px-4 sm:px-8">
        <!-- <div class="lg:hidden mb-6 text-center text-2xl text-gray-600 dark:text-gray-300"> -->
          <!-- {$t('chunks.projectFullName')} -->
        <!-- </div> -->

        <div v-if="page.isNotFound"><NotFound /></div>
        <Content v-else />

        <div v-if="theme.ui.footer" class="mt-24 pb-8"><Footer /></div>
      </main>

    </div>
  </div>

  <div id="to-the-top" class="bottom-0 fixed mb-8 ml-4 max-lg:hidden hidden" aria-hidden="true">
    <span aria-hidden="true"><ToTheTop /></span>
  </div>

</div>
</template>

