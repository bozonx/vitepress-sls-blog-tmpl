---
editLink: false
lastUpdated: false
prev: false
next: false
layout: page
---

<script setup>
import SiteHome from "vitepress-sls-blog-tmpl/src/SiteHome.vue";

const hero = {
  name: "",
  text: "",
  tagline: "",
  image: {
    src: "/img/site-big-logo.webp",
    alt: "",
  },
  actions: [
    {
      theme: "brand",
      text: "Project description",
      link: "/en/doc/",
    },
    {
      theme: "alt",
      text: "Support us",
      link: "/en/page/donate",
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
