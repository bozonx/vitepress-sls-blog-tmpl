<script setup>
const props = defineProps(["firstLine", "secondLine"]);
</script>

<template>
  <div class="mb-14">
    <div class="flex">
      <div>
        <div class="text-6xl font-bold mb-4">{{ props.firstLine }}</div>
        <div class="text-4xl">{{ props.secondLine }}</div>
      </div>
      <div aria-hidden="true">img</div>
    </div>
  </div>
</template>
