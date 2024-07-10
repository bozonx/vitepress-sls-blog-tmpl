<script setup>
import { Icon } from "@iconify/vue";
import { useData } from "vitepress";
import DropdownButton from "../DropdownButton.vue";
import Btn from "../Btn.vue";
import PodcastIcon from "./PodcastIcon.vue";

const { frontmatter, theme } = useData();
</script>

<template>
  <DropdownButton v-if="frontmatter.podcasts" class="podcasts-btn">
    <template #btn-text>
      <span class="mr-1">
        <Icon
          icon="material-symbols:headphones-outline"
          width="1.6rem"
          height="1.6rem"
        />
      </span>
      {{ theme.t.listenPodcast }}
    </template>
    <Btn
      v-for="(link, name) in frontmatter.podcasts"
      :href="link"
      class="rounded-none"
      hideExternalIcon="true"
    >
      <span class="flex">
        <span class="mr-2">
          <PodcastIcon :name="name" :alt="name + ' podcast service icon'" />
        </span>
        {{ theme.t.podcasts[name] }}
      </span>
    </Btn>
  </DropdownButton>
</template>

<style>
.podcasts-btn > .btn-base {
  background: var(--podcast-btn-bg);
  color: white;
}

.podcasts-btn > .btn-base:hover {
  background: var(--podcast-btn-bg-hover);
}
</style>
