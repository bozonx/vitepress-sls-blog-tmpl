<script setup>
import { Icon } from "@iconify/vue";
import { inject, ref, watchPostEffect } from "vue";
import { useData } from "vitepress";

const { isDark, theme } = useData();
const toggleAppearance = inject("toggle-appearance", () => {
  isDark.value = !isDark.value;
});

const switchTitle = ref("");

watchPostEffect(() => {
  switchTitle.value = isDark.value
    ? theme.value.lightModeSwitchTitle || "Switch to light theme"
    : theme.value.darkModeSwitchTitle || "Switch to dark theme";
});
</script>

<template>
  <div class="appearance-wrapper">
    <button
      class="VPSwitch VPSwitchAppearance"
      type="button"
      role="switch"
      :title="switchTitle"
      :aria-checked="isDark"
      @click="toggleAppearance"
    >
      <span class="check">
        <span class="icon">
          <Icon class="icon-var sun" icon="fa-solid:sun" />
          <Icon class="icon-var moon" icon="ri:moon-fill" />
        </span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.appearance-wrapper {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 0.7rem;
}

.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .VPSwitchAppearance :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}

.VPSwitch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--vp-input-border-color);
  background-color: var(--vp-input-switch-bg-color);
  transition: border-color 0.25s !important;
}

.VPSwitch:hover {
  border-color: var(--vp-c-brand-1);
}

.check {
  position: absolute;
  top: 1px;
  /*rtl:ignore*/
  left: 1px;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: var(--vp-c-neutral-inverse);
  box-shadow: var(--vp-shadow-1);
  transition: transform 0.25s !important;
}

.icon {
  position: relative;
  display: block;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  overflow: hidden;
}

.icon .icon-var {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 13px;
  height: 13px;
  color: var(--vp-c-text-2);
}

.dark .icon .icon-var {
  color: var(--vp-c-text-1);
  transition: opacity 0.25s !important;
}
</style>
