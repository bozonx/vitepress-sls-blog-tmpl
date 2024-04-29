
<script setup>
import {ref} from 'vue'
import BtnLink from '../BtnLink.vue'

const props = defineProps(['id', 'class', 'text', 'href', 'target', 'icon', 'mobileOnly'])
</script>

<template>
<BtnLink
  v-bind="props"
  :class="[(props.text ? 'px-5 py-2' : 'px-3 py-3'), ' rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800', props.class]"
/>
</template>

