---
layout: home
---

<script setup>
import HomePageTags from 'vitepress-sls-blog-tmpl/HomePageTags.vue'
import HomeHero from 'vitepress-sls-blog-tmpl/HomeHero.vue'
import UtilPageContent from 'vitepress-sls-blog-tmpl/UtilPageContent.vue'
import { useData } from 'vitepress'
import { data } from './loadPosts.data.js'
import { PROPS } from "../.vitepress/props.js";

const { theme, localeIndex } = useData()

const hero = {
  firstLine: "Some text",
  secondLine: "Some second text",
  img: theme.value.mainHeroImg,
  buttons: [
    {
      text: theme.value.t.toBlog,
      href: `${theme.value.recentBaseUrl}/1`,
      primary: true,
    },
    {
      text: theme.value.t.links.wiki,
      href: `${PROPS.siteUrl}/${localeIndex.value}/${theme.value.docUrl}`,
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
