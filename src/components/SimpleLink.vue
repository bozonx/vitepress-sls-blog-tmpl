<script setup>
import { useData } from 'vitepress'
import { resolveI18Href } from '../helpers/helpers.js'

const { theme, localeIndex } = useData()
const props = defineProps(['class', 'href', 'target'])
const resolvedHref = resolveI18Href(props.href, localeIndex.value, theme.value.i18nRouting)
</script>

<template>
<a :class="['simple-link', props.class]" :href="resolvedHref" :target="target"><slot /></a>
</template>

