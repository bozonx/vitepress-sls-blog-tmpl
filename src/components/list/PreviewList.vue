<script setup>
//import { defineProps } from 'vue'
import PreviewListItem from './PreviewListItem.vue'
import Pagination from './Pagination.vue'

const props = defineProps([
  'allData',
  'curPage', 
  'perPage', 
  'paginationMaxItems',
  'paginationBaseUrl',
  'class'
])
const start = (props.curPage === 1) ? 0 : (props.curPage - 1) * props.perPage
const items = props.allData.slice(start, start + props.perPage)
const totalPages = Math.ceil(props.allData.length / props.perPage)
</script>

<template>
  <div :class="props.class">
    <!-- <PageHeader><slot /></PageHeader> -->

    <!-- <Alert v-if="res.page === 1 && !res.result.length" color="dark">{$t('messages.emptyList')}</Alert>
    <Alert v-else-if="res.page <= 0 || res.page > res.totalPages" color="red">
      <span>{$t('messages.wrongPage')}</span>
      <a href={paginationBaseUrl} class="underline">{$t('chunks.listBeginning')}</a>
    </Alert> -->
    <!-- <ul v-else> -->
    <ul>
      <li v-for="item in items">
        <PreviewListItem :item="item" />
      </li>
    </ul>

          <!-- baseUrl={baseUrl}
          {...pickObj(item, 'name', 'title', 'dateLocal', 'tags', 'descr', 'thumbUrl')} -->

    <div v-if="totalPages > 1" class="mt-14">
      <Pagination
        :curPage="props.curPage"
        :totalPages="totalPages"
        :maxItems="props.paginationMaxItems"
        :baseUrl="props.paginationBaseUrl"
      />
    </div>
  </div>
</template>

