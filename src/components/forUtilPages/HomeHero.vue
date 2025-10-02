<template>
  <div class="mb-14 md:mb-18 home-hero">
    <div class="flex max-lg:flex-col-reverse">
      <div class="flex-1">
        <h1
          class="max-md:text-4xl md:text-6xl font-bold mb-4"
          v-html="props.firstLine"
        ></h1>
        <p class="max-md:text-2xl md:text-4xl" v-html="props.secondLine"></p>
      </div>
      <a
        v-if="props.img"
        aria-hidden="true"
        class="home-logo md:ml-4 max-md:mb-9"
        :href="`/${localeIndex}/${theme.recentBaseUrl}/1`"
      >
        <img :src="props.img" />
      </a>
    </div>
    <ul
      v-if="props.buttons"
      class="sm:flex sm:gap-x-3 max-sm:space-y-6 mt-10 home-hero-buttons"
    >
      <li v-for="item in props.buttons">
        <Btn
          v-bind="item"
          class="rounded-full! px-7! w-fit hover-animation-rise"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import Btn from '../Btn.vue'
import { useData } from 'vitepress'

const { theme, localeIndex } = useData()
const props = defineProps(['firstLine', 'secondLine', 'buttons', 'img'])
</script>

<style scoped>
.home-logo {
  display: flex;
  justify-content: center;
}

.home-logo img {
  width: 320px;
  height: 320px;
  filter: drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.5));
}

@media (max-width: 519px) {
  .home-logo img {
    width: 240px;
    height: 240px;
  }
}

.home-hero h1,
.home-hero p {
  text-shadow: 4px 4px 14px rgba(0, 0, 0, 0.8);
}

.home-hero-buttons .btn-base {
  box-shadow: 8px 8px 18px 0px rgba(0, 0, 0, 0.3);
}

.home-hero-buttons .btn-base:not(.btn--primary) {
  background-color: var(--gray-700);
}
</style>
