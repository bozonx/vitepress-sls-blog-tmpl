<script setup>
import { useData } from "vitepress";
import SimpleLink from "../SimpleLink.vue";

const { theme } = useData();
</script>

<template>
  <div v-if="theme.ui.donateLink">
    <span class="mr-2">{{ theme.t.donateCall }}</span>
    <SimpleLink :href="theme.ui.donateLink">{{
      theme.t.links.donate
    }}</SimpleLink>
  </div>
</template>
