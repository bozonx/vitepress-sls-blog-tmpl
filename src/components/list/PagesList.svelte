<script>
import {Alert} from 'flowbite-svelte';
import {pickObj} from 'squidlet-lib';
import {page} from "$app/stores";
import PagePreviewListItem from '$lib/components/PagePreviewListItem.svelte'
import Pagination from '$lib/components/Pagination.svelte'
import PageHeader from '$lib/components/PageHeader.svelte'
import {PAGINATION_MAX_ITEMS} from '$lib/constants'
import {t} from '$lib/store/t'


let className = ''
let paginationBaseUrl

$: paginationBaseUrl = $page.url.pathname.replace(/\/\d+$/, '')

export { className as class }
export let res
export let baseUrl

</script>

<div class="{className}">
  <PageHeader><slot /></PageHeader>

  {#if res.page === 1 && !res.result.length}
    <Alert color="dark">{$t('messages.emptyList')}</Alert>
  {:else if res.page <= 0 || res.page > res.totalPages}
    <Alert color="red">
      <span>{$t('messages.wrongPage')}</span>
      <a href={paginationBaseUrl} class="underline">{$t('chunks.listBeginning')}</a>
    </Alert>
  {:else}
    <ul>
      {#each res.result as item}
        <li>
          <PagePreviewListItem
            baseUrl={baseUrl}
            {...pickObj(item, 'name', 'title', 'dateLocal', 'tags', 'descr', 'thumbUrl')}
          />
        </li>
      {/each}
    </ul>

    {#if res.totalPages > 1}
      <div class="mt-14">
        <Pagination
          curPage={res.page}
          totalPages={res.totalPages}
          maxItems={PAGINATION_MAX_ITEMS}
          baseUrl={paginationBaseUrl}
        />
      </div>
    {/if}
  {/if}
</div>
