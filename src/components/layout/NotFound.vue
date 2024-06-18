<script setup>
import { useData } from "vitepress";
import SimpleLink from "../SimpleLink.vue";

const { theme } = useData();
</script>

<template>
  <div class="mt-32">
    <div class="text-3xl mb-4">{{ theme.t.notFound }}</div>
    <div>
      <SimpleLink>{{ theme.t.returnToHome }}</SimpleLink>
    </div>
  </div>
</template>
