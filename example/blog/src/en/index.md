---
layout: home
---

<script setup>
import HomePageTags from 'vitepress-sls-blog-tmpl/src/components/home/HomePageTags.vue'
import HomeHero from 'vitepress-sls-blog-tmpl/src/components/home/HomeHero.vue'
import UtilPageContent from 'vitepress-sls-blog-tmpl/src/components/UtilPageContent.vue'
import { useData } from 'vitepress'
import { data } from './loadPosts.data.js'
import { PROPS } from "../.vitepress/props.js";

const { theme, localeIndex } = useData()

const hero = {
  firstLine: "Some text",
  secondLine: "Some second text",
  buttons: [
    {
      text: "Go to blog",
      href: "recent/1",
      primary: true,
    },
    {
      text: theme.value.t.links.wiki,
      href: `${PROPS.siteUrl}/${localeIndex.value}/${PROPS.docUrl}`,
      icon: theme.value.docIcon,
    },
    {
      text: theme.value.t.links.donate,
      href: `${PROPS.siteUrl}/${localeIndex.value}/${theme.value.donateUrl}`,
      icon: theme.value.donateIcon,
    },
  ],
}
</script>

<HomeHero v-bind="hero" />
<HomePageTags :header="theme.t.tags" :allData="data.posts" />

<UtilPageContent>

## Some header

other text

</UtilPageContent>
