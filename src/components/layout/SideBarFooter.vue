<script setup>
const props = defineProps(['class'])
</script>

<template>

<slot name="sidebar-footer" />

<div :class="['w-full flex justify-end items-end mr-2 pt-5 pb-3 pr-2 space-x-1', props.class]">
  <!-- <SwitchLanguage /> -->
  <!-- <DarkModeSwitch /> -->
</div>
</template>

