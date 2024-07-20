<script setup>
import Btn from "../Btn.vue";

const props = defineProps(["firstLine", "secondLine", "buttons", "img"]);
</script>

<template>
  <div class="mb-24 home-hero">
    <div class="flex max-md:flex-col-reverse">
      <div class="flex-1">
        <div class="text-6xl font-bold mb-4" v-html="props.firstLine"></div>
        <div class="text-4xl" v-html="props.secondLine"></div>
      </div>
      <div v-if="props.img" aria-hidden="true" class="home-logo md:ml-4 max-md:mb-14">
        <img :src="props.img" />
      </div>
    </div>
    <ul v-if="props.buttons" class="sm:flex sm:space-x-3 max-sm:space-y-10 mt-20">
      <li v-for="item in props.buttons">
        <Btn v-bind="item" onlyDark="true" class="!rounded-full !px-7 w-fit" />
      </li>
    </ul>
  </div>
</template>

<style>
.home-logo {
  display: flex;
  justify-content: center;
}

.home-logo img {
  width: 320px;
}
</style>
