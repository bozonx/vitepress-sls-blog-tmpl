<script setup>
// import TagsList from "../TagsList.vue";

const props = defineProps(["firstLine", "secondLine"]);
</script>

<template>
  <div class="mb-14">
    <div class="flex">
      <div>
        <div class="text-6xl font-bold mb-4">{{ props.firstLine }}</div>
        <div class="text-4xl">{{ props.secondLine }}</div>
      </div>
      <div></div>
    </div>
  </div>
</template>
