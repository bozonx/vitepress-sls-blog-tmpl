<script>
import {Img} from 'flowbite-svelte';
import {page} from "$app/stores";
import TagList from "$lib/components/TagList.svelte";


export let name
export let title
export let dateLocal = null
export let tags = {}
export let descr
export let baseUrl
export let thumbUrl = null

let fullhref

$: fullhref = `${baseUrl}/${name}`
</script>

<div
  data-href={fullhref}
  class="mb-6 px-5 py-5 cursor-pointer bg-white dark:bg-gray-800 border rounded-lg border-gray-200 dark:border-gray-700 page-list-item"
>
  <h4 class="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    {title}
  </h4>
  <div class="md:flex w-full">
    {#if thumbUrl}
      <div class="md:mr-4">
        <a href={fullhref}>
          <Img
            class="w-80"
            src={thumbUrl}
            loading="lazy"
            alt="{title} thumbnail"
          />
        </a>

        {#if dateLocal}
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">{dateLocal}</div>
        {/if}

        {#if Object.keys(tags || {}).length}
          <TagList tags={tags} class="mt-2" />
        {/if}
      </div>
    {/if}

    <a href={fullhref} class="max-md:mt-5 flex-1 block">
      <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{descr}</p>
      <p>...</p>
    </a>
  </div>

  {#if !thumbUrl}
    <div class="flex items-end mt-4">
      {#if Object.keys(tags || {}).length}
        <TagList tags={tags} class="flex-1 mr-2" />
      {/if}

      {#if dateLocal}
        <div class="text-sm text-gray-500 dark:text-gray-400">{dateLocal}</div>
      {/if}
    </div>
  {/if}
</div>
