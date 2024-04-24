<script>
import {Button} from "flowbite-svelte"
import {page} from "$app/stores";


let className = ''

// TODO: review
const isActive = (tag) => {
  return decodeURI($page.url.pathname)
    .startsWith(`/${$page.params.lang}/tags/${tag}`)
}

export let tags = {}
export { className as class }
</script>

<div class="flex flex-wrap gap-x-1 gap-y-1 {className}">
  {#each Object.keys(tags) as tagName}
    {#key `${$page.url.pathname} ${tags[tagName].slug}`}
      <Button
        href={`/${$page.params.lang}/tags/${tags[tagName].slug}/1`}
        pill
        size="sm"
        color={(isActive(tags[tagName].slug)) ? 'purple' : 'blue'}
        class="py-1 px-4"
      >{tagName}</Button>
    {/key}
  {/each}
</div>
