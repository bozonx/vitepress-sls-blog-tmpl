<script setup>
import {page} from "$app/stores";
import {t} from '$lib/store/t'


let className = ''

export { className as class }
</script>


<a
  href={`/${$page.params.lang}`}
  class="flex items-center sidebar-logo {className}"
>
  <img src="/images/site_logo.svg" class="h-16" alt="Project logo" />
  <div class="text-xl font-semibold text-black w-min sidebar-logo__text">
    {@html $t('chunks.projectLogo')}
  </div>
</a>
