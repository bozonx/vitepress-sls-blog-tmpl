<script setup>
import VPHero from "vitepress/dist/client/theme-default/components/VPHero.vue";
import VPFeatures from "vitepress/dist/client/theme-default/components/VPFeatures.vue";
import VPHomeContent from "vitepress/dist/client/theme-default/components/VPHomeContent.vue";

const props = defineProps(["hero", "features"]);
</script>

<template>
  <div class="VPHome">
    <template v-if="props.hero">
      <VPHero v-bind="props.hero" />
    </template>
    <template v-if="props.features">
      <VPFeatures :features="props.features" />
    </template>
    <VPHomeContent style="margin-top: 2rem; margin-bottom: 4rem">
      <slot />
    </VPHomeContent>
  </div>
</template>
