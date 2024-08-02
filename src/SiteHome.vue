<script setup>
import VPHero from "vitepress/dist/client/theme-default/components/VPHero.vue";
import VPFeatures from "vitepress/dist/client/theme-default/components/VPFeatures.vue";
import VPHomeContent from "vitepress/dist/client/theme-default/components/VPHomeContent.vue";

const props = defineProps(["hero", "features"]);
</script>

<template>
  <div>
    <template v-if="props.hero">
      <VPHero v-bind="props.hero" />
    </template>
    <template v-if="props.features">
      <VPFeatures :features="props.features" />
    </template>
    <VPHomeContent style="margin-top: 2.5rem; margin-bottom: 4rem">
      <slot />
    </VPHomeContent>
  </div>
</template>

<style>
.VPHero a,
.VPFeatures a {
  text-decoration: none;
  color: inherit;
}

.VPFeatures h2 {
  margin: 0;
  border: 0 none;
  padding: 0;
  letter-spacing: normal;
}

.VPFeatures p {
  margin: 0;
}
</style>
