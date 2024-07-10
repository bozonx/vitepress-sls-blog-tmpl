<script setup>
import SideBarHeader from "./SideBarHeader.vue";
import SideBarLink from "./SideBarLink.vue";

const props = defineProps(["items", "isMobile"]);
</script>

<template>
  <ul v-if="props.items?.length" class="space-y-1">
    <template v-for="item in props.items">
      <li :class="{ hidden: item.mobile ? !props.isMobile : false }">
        <SideBarHeader
          v-if="item.header"
          :text="item.header"
          :href="item.href"
          :icon="item.icon"
          :class="item.class"
        />
        <SideBarLink v-else v-bind="item" />
      </li>
    </template>
  </ul>
</template>
