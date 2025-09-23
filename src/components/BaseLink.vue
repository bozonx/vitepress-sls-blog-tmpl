<script setup>
import { useData, useRoute } from 'vitepress'
import { ref, watchEffect, computed } from 'vue'
import { resolveI18Href, isExternalUrl } from '../helpers/helpers.js'

const { theme, localeIndex } = useData()
const route = useRoute()
const props = defineProps(['tag', 'class', 'href', 'target'])
// Реактивные вычисляемые свойства
const resolvedHref = computed(() =>
  resolveI18Href(props.href, localeIndex.value, theme.value.i18nRouting)
)
const isExternal = computed(() => isExternalUrl(props.href))
const tag = computed(() => props.tag || 'a')
const className = computed(() => props.class)
const target = computed(() => {
  if (tag.value === 'a') {
    if (typeof props.target === 'undefined') {
      return isExternal.value ? '_blank' : props.target
    } else {
      return props.target
    }
  }
  return undefined
})

let prevPath = route.path
const active = ref(prevPath === resolvedHref.value)

watchEffect(async () => {
  if (route.path !== prevPath) {
    prevPath = route.path

    active.value = route.path === resolvedHref
  }
})
</script>

<template>
  <component
    :is="tag"
    v-bind="props"
    :target="target"
    :href="resolvedHref"
    :class="[active && 'active', className]"
  >
    <slot />
  </component>
</template>
