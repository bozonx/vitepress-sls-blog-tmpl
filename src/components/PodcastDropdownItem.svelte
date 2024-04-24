<script>
import {DropdownItem} from "flowbite-svelte"
import {HeadphonesSolid} from 'flowbite-svelte-icons';
import PoscastIcon from "./PoscastIcon.svelte"
import {t} from '$lib/store/t'


export let poscastName
export let href
</script>

{#if poscastName === 'site'}
  <DropdownItem class="flex items-center" href={href} target="_blank">
    <span class="mr-2"><HeadphonesSolid class="w-5" /></span>
    <span> {$t(`podcasts.${poscastName}`)}</span>
  </DropdownItem>
{:else}
  <DropdownItem class="flex items-center" href={href} target="_blank">
    <span class="mr-2"><PoscastIcon icon={poscastName} class="w-5" /></span>
    <span> {$t(`podcasts.${poscastName}`)}</span>
  </DropdownItem>
{/if}
