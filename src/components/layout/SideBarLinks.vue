<script setup>
import SideBarHeader from './SideBarHeader.vue'
import SideBarItem from './SideBarItem.vue'

const props = defineProps(['items'])
</script>

<template>
<ul>
  <li v-for="item in items">
    <SideBarHeader v-if="item.header" :text="item.header" :href="item.href" :icon="item.icon" :class="item.class" />
    <SideBarItem v-else :text="item.text" :href="item.href" :icon="item.icon" :class="item.class" />
  </li>
</ul>
</template>

