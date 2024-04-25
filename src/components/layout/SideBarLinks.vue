<script setup>
import SideBarHeader from './SideBarHeader.vue'
import SideBarItem from './SideBarItem.vue'

const props = defineProps(['items', 'isMobile'])
</script>

<template v-if="props.items?.length">
<ul class="space-y-2">
  <template v-for="item in items">
    <li :class="{hidden: (item.mobile) ? !isMobile : false}">
      <SideBarHeader
        v-if="item.header"
        :text="item.header"
        :href="item.href"
        :icon="item.icon"
        :class="item.class"
      />
      <SideBarItem
        v-else
        :text="item.text"
        :href="item.href"
        :icon="item.icon"
        :class="item.class"
      />
    </li>
  </template>
</ul>
</template>

