<template>
  <SimpleLink
    v-if="allowEditLink"
    :href="editLinkHref"
    target="_blank"
    rel="nofollow"
    class="flex items-center gap-x-2"
  >
    <Icon icon="bx:edit" class="muted" />
    {{ theme.editLink?.text }}
  </SimpleLink>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { isPost, isPage } from '../helpers/helpers.js'
import SimpleLink from './SimpleLink.vue'

const { page, frontmatter, theme } = useData()

const allowEditLink = computed(() => {
  return (
    theme.value?.editLink &&
    frontmatter.value?.editLink !== false &&
    (isPost(frontmatter.value) || isPage(frontmatter.value))
  )
})

const editLinkHref = computed(() => {
  return theme.value?.editLink?.pattern.replace(
    ':path',
    page.value.relativePath
  )
})
</script>
