<script setup>
import PreviewListItem from './PreviewListItem.vue'
import Pagination from './Pagination.vue'
import { useData } from 'vitepress'

const { theme } = useData()
const props = defineProps([
  'allPosts',
  'curPage',
  'perPage',
  'paginationMaxItems',
  'paginationBaseUrl',
])
const start = props.curPage === 1 ? 0 : (props.curPage - 1) * props.perPage
const items = props.allPosts.slice(start, start + props.perPage)
const totalPages = Math.ceil(props.allPosts.length / props.perPage)
</script>

<template>
  <div v-if="items.length">
    <ul>
      <template v-for="item in items">
        <li
          v-if="item"
          :data-popularity-value="
            item.analyticsStats?.[theme.popularPosts?.sortBy]
          "
        >
          <PreviewListItem :item="item" class="hover-animation-rise" />
        </li>
      </template>
    </ul>

    <div v-if="props.paginationBaseUrl && totalPages > 1" class="mt-14">
      <Pagination
        :curPage="props.curPage"
        :totalPages="totalPages"
        :maxItems="props.paginationMaxItems"
        :baseUrl="props.paginationBaseUrl"
      />
    </div>
  </div>
</template>
