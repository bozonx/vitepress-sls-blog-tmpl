<script setup>
const props = defineProps(['class'])
</script>


<template>
<div :class="['mb-6', props.class]">
  <slot />
</div>
</template>

