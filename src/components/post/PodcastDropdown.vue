<script setup>
import { Icon } from "@iconify/vue";
import { useData } from "vitepress";
import DropdownButton from "../DropdownButton.vue";
import DropdownItem from "../DropdownItem.vue";
import PodcastIcon from "./PodcastIcon.vue";

const { frontmatter, theme } = useData();
const btnText =
  theme.value.t.listenPodcast +
  (frontmatter.value.podcastLang ? ` (${frontmatter.value.podcastLang})` : "");
</script>

<template>
  <DropdownButton v-if="frontmatter.podcasts" class="podcasts-btn">
    <template #btn-text>
      <span class="mr-1" aria-hidden="true">
        <Icon icon="material-symbols:headphones-outline" width="1.6rem" height="1.6rem" />
      </span>
      {{ btnText }}
    </template>

    <DropdownItem v-for="(link, name) in frontmatter.podcasts" :href="link" hideExternalIcon="true">
      <span class="flex">
        <span class="mr-2">
          <PodcastIcon :name="name" :alt="name + ' podcast service icon'" />
        </span>
        {{ theme.t.podcasts[name] }}
      </span>
    </DropdownItem>
  </DropdownButton>
</template>

<style>
.podcasts-btn>.btn-base {
  background: var(--podcast-btn-bg);
  color: white;
}

.podcasts-btn>.btn-base:hover {
  background: var(--podcast-btn-bg-hover);
}
</style>
