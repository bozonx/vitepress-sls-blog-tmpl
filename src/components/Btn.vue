<script setup>
import { useData } from 'vitepress'
import { useSlots } from 'vue'
import { Icon } from '@iconify/vue'
import { isExternalUrl } from '../helpers/helpers.js'
import BaseLink from './BaseLink.vue'

const slots = useSlots()
const { theme } = useData()
const props = defineProps([
  // 'id',
  'class',
  'href',
  // 'title',
  'target',
  'disabled',
  'activeCompareMethod',

  'icon',
  'text',
  'iconClass',
  'noBg',
  'onlyDark',
  'primary',
  'hideExternalIcon',
])
const isExternal = !props.hideExternalIcon && isExternalUrl(props.href)
const hasText = props.text || slots.default
const btnProps = {}

if (props.href && !props.disabled) {
  // means just link
  btnProps.tag = 'a'
  btnProps.href = props.href
  btnProps.target = props.target
} else {
  // means Button
  btnProps.tag = 'button'
  btnProps.disabled = props.disabled
}
</script>

<template>
  <BaseLink
    v-bind="btnProps"
    :class="[
      'flex cursor-pointer items-center rounded-lg',
      !hasText && 'icon-only',
      'btn-base',
      btnProps.disabled && 'disabled',
      props.primary && 'btn--primary',
      props.onlyDark && 'btn--only-dark',
      props.noBg && 'btn--nobg',
      props.class,
    ]"
    :activeCompareMethod="props.activeCompareMethod"
  >
    <span class="flex items-center gap-x-2">
      <span
        v-if="props.icon"
        aria-hidden="true"
        class="btn-base__icon-container"
      >
        <Icon :icon="props.icon" :class="props.iconClass" />
      </span>
      <span
        v-if="hasText"
        :class="
          theme.externalLinkIcon && isExternal && hasText && 'external-link'
        "
      >
        <slot>{{ props.text }}</slot>
      </span>
    </span>
    <!-- <span
      v-if="theme.externalLinkIcon && isExternal && hasText"
      class="btn-base__external"
      aria-hidden="true"
    >
      <Icon icon="mdi:arrow-top-right" />
    </span> -->
  </BaseLink>
</template>

<style>
/* .btn-base__external {
  padding-left: 0.25rem;
  font-size: 13px;
  margin-right: -0.3rem;
  color: var(--gray-500);
}

.dark .btn-base__external,
.btn-base__external.btn--only-dark {
  color: var(--gray-600);
} */

.btn-base {
  padding: 0.5rem 1.25rem 0.5rem 1.25rem;
  line-height: 1.5rem;
  background: var(--btn-bg);
}

.dark .btn-base,
.btn-base.btn--only-dark {
  background: var(--btn-dark-bg);
  color: var(--gray-200);
}

.btn-base.icon-only {
  padding: 0.75rem;
}

.btn-base.btn--nobg,
.dark .btn-base.btn--nobg {
  background: transparent;
}

.btn-base:hover {
  background: var(--btn-bg);
  filter: brightness(103%);
}

.dark .btn-base:hover,
.btn-base.btn--only-dark:hover {
  background: var(--btn-dark-bg);
  filter: brightness(110%);
}

.btn-base.active {
  background: var(--btn-bg-active);
  border: 3px solid var(--gray-400);
}

.btn-base.active:hover {
  background: var(--btn-bg-active);
  filter: brightness(105%);
}

.dark .btn-base.active,
.btn-base.active.btn--only-dark {
  background: var(--btn-dark-bg-active);
  border-color: var(--gray-600);
  color: white;
}

.dark .btn-base.active:hover,
.btn-base.active.btn--only-dark:hover {
  background: var(--btn-dark-bg-active);
  filter: brightness(110%);
}

.btn-base.btn--primary,
.dark .btn-base.btn--primary {
  background: var(--primary-btn-bg);
  color: var(--gray-100);
}

.btn-base.btn--primary:hover,
.dark .btn-base.btn--primary:hover {
  background: var(--primary-btn-bg);
  filter: brightness(110%);
}

.btn-base.btn--primary.active,
.dark .btn-base.btn--primary.active {
  background: var(--primary-btn-bg-active);
}

.btn-base.btn--primary.active:hover,
.dark .btn-base.btn--primary.active:hover {
  background: var(--primary-btn-bg-active);
  filter: brightness(110%);
}

.btn-base.disabled,
.btn-base.disabled:hover {
  background: var(--gray-300);
  cursor: not-allowed;
  transform: none;
}

.dark .btn-base.disabled,
.dark .btn-base.disabled:hover,
.btn-base.disabled.btn--only-dark {
  color: var(--gray-400);
  background: var(--gray-600);
}
</style>
