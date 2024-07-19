<script setup>
import { useData } from "vitepress";
import SimpleLink from "../SimpleLink.vue";

const { theme } = useData();
</script>

<template>
  <div v-if="theme.postDonateCall">{{ theme.postDonateCall }}</div>
</template>
