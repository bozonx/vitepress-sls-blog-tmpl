<script setup>
import { useData } from "vitepress";
import SimpleLink from "../SimpleLink.vue";

const { theme } = useData();
</script>

<template>
  <div v-if="theme.postDonateCall" v-html="theme.postDonateCall" class="vp-doc"></div>
</template>
