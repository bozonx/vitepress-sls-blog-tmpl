<script setup>
import Btn from "../Btn.vue";

const props = defineProps(["firstLine", "secondLine", "buttons"]);
</script>

<template>
  <div class="mb-24">
    <div class="flex">
      <div>
        <div class="text-6xl font-bold mb-4">{{ props.firstLine }}</div>
        <div class="text-4xl">{{ props.secondLine }}</div>
      </div>
      <!-- <div aria-hidden="true">img</div> -->
    </div>
    <ul
      v-if="props.buttons"
      class="sm:flex sm:space-x-3 max-sm:space-y-10 mt-24"
    >
      <li v-for="item in props.buttons">
        <Btn v-bind="item" class="!rounded-full !px-7 w-fit" />
      </li>
    </ul>
  </div>
</template>
