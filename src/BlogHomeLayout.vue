<script setup>
import { useData, inBrowser } from "vitepress";
import { ref, watchEffect } from "vue";
import SwitchLang from "./components/layout/SwitchLang.vue";

const props = defineProps(["scrollY"]);
const { theme } = useData();
const valueY = ref(0);
const wrapperRef = ref(null);
const BG_HEIGHT_OFFSET = theme.value.homeBgParalaxOffset || 150;

watchEffect(async () => {
  if (!inBrowser) return;

  const totalHeight = wrapperRef.value?.scrollHeight || 0;
  const windowHeight = window.innerHeight;
  const totalScroll = totalHeight - windowHeight;
  // from 0 to 1
  const scrollProgress = props.scrollY / totalScroll;

  valueY.value = props.scrollY - BG_HEIGHT_OFFSET * scrollProgress;
});
</script>

<template>
  <div ref="wrapperRef" class="home-layout"
    :style="`background-position-y: ${valueY}px; background-size: auto calc(100vh + ${BG_HEIGHT_OFFSET}px);`">
    <div class="home-layout-topbar">
      <SwitchLang dropLeft="true" onlyDark="true" noBg="true" />
    </div>
    <div class="home-layout-page">
      <Content />
    </div>
  </div>
</template>

<style scoped>
.home-layout {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position-x: center;
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
