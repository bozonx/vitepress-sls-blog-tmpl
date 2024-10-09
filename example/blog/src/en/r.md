---
layout: false
---

<script setup>
import { onMounted } from "vue";
import { useData, inBrowser } from "vitepress";

const { localeIndex } = useData()

onMounted(() => {
  if (inBrowser) window.location.replace(`/${localeIndex.value}/recent/1`);
});
</script>

<div></div>
