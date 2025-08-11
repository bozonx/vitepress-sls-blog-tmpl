---
layout: false
---

<script setup>
import { onMounted } from "vue";
import { inBrowser } from "vitepress";
import { handleFastRedirectToRecentPosts } from 'vitepress-sls-blog-tmpl/helpers.js'

onMounted(() => {
  if (inBrowser) handleFastRedirectToRecentPosts(window)
});
</script>

<div></div>
