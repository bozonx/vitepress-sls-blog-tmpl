---
layout: page
---

<script setup>
import { useData } from "vitepress";
import SiteHome from "vitepress-sls-blog-tmpl/SiteHome.vue";

const { theme, localeIndex } = useData();

const hero = {
  name: "",
  text: "",
  tagline: "",
  image: {
    src: theme.value.mainHeroImg,
    alt: "",
  },
  actions: [
    {
      theme: "brand",
      text: "Project description",
      link: `/${localeIndex.value}/${theme.value.docUrl}/`,
    },
    {
      theme: "alt",
      text: "Support us",
      link: `/${localeIndex.value}/${theme.value.donateUrl}`,
    },
    {
      theme: "alt",
      text: "Our telegram channel",
      link: "",
    },
  ],
}
const features = [
  {
    icon: "🤝",
    title: "",
    details: "",
    linkText: "Читать о",
    link: "/ru/doc/",
  },
  {
    icon: "📖",
    title: "",
    details: "",
    linkText: "Читать о",
    link: "/ru/doc/",
  },
  {
    icon: "⚔️",
    title: "",
    details: "",
    linkText: "Читать о",
    link: "/ru/doc/",
  },
]
</script>

<SiteHome :hero="hero" :features="features">
</SiteHome>
