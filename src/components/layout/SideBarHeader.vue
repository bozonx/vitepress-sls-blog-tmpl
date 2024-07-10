<script setup>
const props = defineProps(["id", "class", "text"]);
</script>

<template>
  <h4
    :id="props.id"
    :class="[
      'font-bold w-full text-sm pl-3 mt-6 mb-1 text-gray-500 dark:text-gray-400',
      props.class,
    ]"
  >
    <span>{{ props.text }}</span>
  </h4>
</template>
