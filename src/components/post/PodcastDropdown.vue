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

    <template v-for="(link, name) in frontmatter.podcasts">
      <DropdownItem v-if="link" :href="link" hideExternalIcon="true">
        <span class="flex">
          <span class="mr-2">
            <PodcastIcon :name="name" :alt="name + ' podcast service icon'" />
          </span>
          {{ theme.t.podcasts[name] }}
        </span>
      </DropdownItem>
    </template>
  </DropdownButton>
</template>

<style>
.podcasts-btn {
  width: fit-content;
}

.podcasts-btn>.btn-base {
  background: var(--podcast-btn-bg) !important;
  color: white;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.podcasts-btn>.btn-base:hover {
  filter: brightness(110%);
}
</style>
