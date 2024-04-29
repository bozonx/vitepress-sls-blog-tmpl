<script>
import { Button, ButtonGroup } from "flowbite-svelte"
import {page} from "$app/stores";


let items = []

$: {
  items = []

  items.push({
    name: '<',
    href: `${baseUrl}/${curPage - 1}`,
    active: false,
    disabled: curPage <= 1
  })

  // TODO: расчитать чтобы текущая была посередине и показать максимум

  for (let i = 1; i <= totalPages; i++) {
    items.push({
      name: i,
      href: `${baseUrl}/${i}`,
      active: i === curPage,
      disabled: false
    })
  }

  items.push({
    name: '>',
    href: `${baseUrl}/${curPage + 1}`,
    active: false,
    disabled: curPage === totalPages || totalPages <= 1
  })
}

export let curPage
export let totalPages
export let maxItems
export let baseUrl
</script>

<ButtonGroup>
  {#each items as item}
    {#key item.name}
      <Button
        href={(item.disabled) ? null : item.href}
        disabled={item.disabled}
        color={item.active ? 'blue' : 'light'}
        class={item.disabled && 'bg-gray-200'}
        large
      >{item.name}</Button>
    {/key}
  {/each}
</ButtonGroup>
