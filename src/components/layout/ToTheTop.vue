<script setup>
import ToTheTopDesktop from "./ToTheTopDesktop.vue";
import ToTheTopMobile from "./ToTheTopMobile.vue";
import { MOBILE_BREAKPOINT } from "../../constants.js";

const props = defineProps(["scrollY", "windowWidth"]);
</script>

<template>
  <ToTheTopDesktop v-if="props.windowWidth >= MOBILE_BREAKPOINT" :scrollY="scrollY" />
  <ToTheTopMobile v-else :scrollY="scrollY" />
</template>
