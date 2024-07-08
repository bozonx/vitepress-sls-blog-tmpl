import { base } from "vitepress-sls-blog-tmpl/src/configs/blogLocalesBase/en.js";

export default {
  ...base,
  title: "Site title",
  siteTitle: "Site title",
  description: "Site description",
  heroFirstLine: "First header",
  heroSecondLine: "Second header",
  authors: {
    "some-auth": { name: "Ivan K", descr: "Some MD text" },
  },
  footer: {
    text: "Footer text",
    copyright: "Copyright © 2024-present My Project",
  },
};
