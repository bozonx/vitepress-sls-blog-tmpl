<script setup>
import Btn from "../Btn.vue";

const props = defineProps(["firstLine", "secondLine", "buttons"]);
</script>

<template>
  <div class="mb-24 home-hero">
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
        <Btn v-bind="item" class="!rounded-full !px-7 home-button" />
      </li>
    </ul>
  </div>
</template>

<style>
.home-hero {
  color: white !important;
}

.home-button {
  width: fit-content;
  color: white !important;
  background-color: var(--home-btn-bg) !important;
}

.home-button.btn--primary {
  background: var(--primary-btn-bg) !important;
}

.home-button:hover {
  filter: brightness(110%);
}

.home-hero .btn-base__external {
  color: var(--gray-500) !important;
}
</style>
