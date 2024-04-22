<script setup>
//import { defineProps } from 'vue'
import PagePreviewListItem from './PostPreviewListItem.vue'

const props = defineProps(['data', 'className'])


</script>

<template>
  <div :class="props.className">
    <!-- <PageHeader><slot /></PageHeader> -->

    <!-- <Alert v-if="res.page === 1 && !res.result.length" color="dark">{$t('messages.emptyList')}</Alert>
    <Alert v-else-if="res.page <= 0 || res.page > res.totalPages" color="red">
      <span>{$t('messages.wrongPage')}</span>
      <a href={paginationBaseUrl} class="underline">{$t('chunks.listBeginning')}</a>
    </Alert> -->
    <!-- <ul v-else> -->
    <ul>
      <li v-for="item in data.result">
        <PagePreviewListItem :data="item" />
      </li>
    </ul>

          <!-- baseUrl={baseUrl}
          {...pickObj(item, 'name', 'title', 'dateLocal', 'tags', 'descr', 'thumbUrl')} -->

      <!-- {#if res.totalPages > 1}
        <div class="mt-14">
          <Pagination
            curPage={res.page}
            totalPages={res.totalPages}
            maxItems={PAGINATION_MAX_ITEMS}
            baseUrl={paginationBaseUrl}
          />
        </div>
      {/if} -->
  </div>
</template>

