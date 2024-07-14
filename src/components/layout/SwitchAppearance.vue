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
    <button class="VPSwitch VPSwitchAppearance" type="button" role="switch" :title="switchTitle" :aria-checked="isDark"
      @click="toggleAppearance">
      <span class="check">
        <span class="icon">
          <span class="vpi-sun sun" />
          <span class="vpi-moon moon" />
          <!-- <Icon class="icon-var sun" icon="fa-slid:sun" /> -->
          <!-- <Icon class="icon-var moon" icon="ri:moon-fill" /> -->
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

[class^="vpi-"] {
  -webkit-mask: var(--icon) no-repeat;
  mask: var(--icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
}

.vpi-sun {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Cpath d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41'/%3E%3C/svg%3E");
}

.vpi-moon {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'/%3E%3C/svg%3E");
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
  border: 1px solid var(--switch-appearance-border-color);
  background-color: var(--switch-appearance-bg-color);
  transition: border-color 0.25s !important;
}

.dark .VPSwitch {
  border: 1px solid var(--switch-appearance-dark-border-color);
  background-color: var(--switch-appearance-dark-bg-color);
}

.VPSwitch:hover {
  border-color: var(--switch-appearance-border-color-hover);
}

.VPSwitch:hover {
  border-color: var(--switch-appearance-dark-border-color-hover);
}

.check {
  position: absolute;
  top: 1px;
  /*rtl:ignore*/
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--switch-appearance-check-bg);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s !important;
}

.dark .check {
  background-color: var(--switch-appearance-dark-check-bg);
}

.icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

/* .icon .icon-var { */
.icon :deep([class^="vpi-"]) {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  color: var(--switch-appearance-icon-color);
}

/* .dark .icon .icon-var { */
.dark .icon :deep([class^="vpi-"]) {
  color: var(--switch-appearance-dark-icon-color);
  transition: opacity 0.25s !important;
}
</style>
