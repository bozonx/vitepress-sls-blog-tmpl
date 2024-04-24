<script>
  import {Button} from "flowbite-svelte"
  import {page} from "$app/stores";


  let className = ''
  const isActive = (tag) => {
    return decodeURI($page.url.pathname)
      .startsWith(`/${$page.params.lang}/tags/${tag}`)
  }

  export let tags = {}
  export { className as class }
</script>

<div class="sm:grid grid-cols-4 gap-2 max-sm:space-x-1 max-sm:space-y-2 {className}">
  {#each Object.keys(tags) as tagName}
    {#key `${$page.url.pathname} ${tags[tagName].slug}`}
      <Button
        href={`/${$page.params.lang}/tags/${tags[tagName].slug}/1`}
        pill
        size="lg"
        color={(isActive(tags[tagName].slug)) ? 'purple' : 'blue'}
        class="py-1 px-4"
      >{tagName} ({tags[tagName].count})</Button>
    {/key}
  {/each}
</div>
