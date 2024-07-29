import fs from "fs";
import path from "path";
import { DEFAULT_ENCODE } from "../constants.js";
import { parseMdFile } from "./parseMdFile.js";
import { resolvePreview } from "./makePreviewItem.js";

/**
 * Add OpenGraph metatags to the page
 */
export function addOgMetaTags(pageData, { siteConfig }) {
  // skip root index.md
  if (pageData.filePath.indexOf("/") < 0) return;

  const langIndex = pageData.filePath.split("/")[0];
  const langConfig = siteConfig.site.locales[langIndex];
  const title =
    pageData.frontmatter.layout === "home"
      ? langConfig.title
      : `${pageData.title} | ${langConfig.title}`;
  const author = langConfig.themeConfig.authors?.find(
    (item) => item.id === pageData.frontmatter.authorId,
  )?.name;
  const img = siteConfig.sitemap.hostname + pageData.frontmatter.cover;

  let descr = pageData.frontmatter.description;

  // means article
  if (pageData.frontmatter.date) {
    const rawContent = fs.readFileSync(
      path.join(siteConfig.srcDir, pageData.filePath),
      DEFAULT_ENCODE,
    );
    const { content } = parseMdFile(rawContent);
    descr = resolvePreview(pageData.frontmatter, content);
  }

  pageData.frontmatter.head ??= [];

  pageData.frontmatter.head.push([
    "meta",
    {
      name: "og:site_name",
      content: langConfig.title,
    },
  ]);

  // means article
  if (pageData.frontmatter.date) {
    pageData.frontmatter.head.push([
      "meta",
      {
        name: "og:type",
        content: "article",
      },
    ]);

    pageData.frontmatter.head.push([
      "meta",
      {
        name: "article:published_time",
        content: pageData.frontmatter.date,
      },
    ]);

    pageData.frontmatter.authorId &&
      pageData.frontmatter.head.push([
        "meta",
        {
          name: "article:author",
          content: author,
        },
      ]);
  }

  pageData.frontmatter.cover &&
    pageData.frontmatter.head.push([
      "meta",
      {
        name: "og:image",
        content: img,
      },
    ]);

  pageData.frontmatter.head.push([
    "meta",
    {
      name: "og:title",
      content: title,
    },
  ]);

  descr &&
    pageData.frontmatter.head.push([
      "meta",
      {
        name: "og:description",
        content: descr,
      },
    ]);

  pageData.frontmatter.head.push([
    "meta",
    {
      name: "twitter:card",
      content: "summary",
    },
  ]);

  pageData.frontmatter.head.push([
    "meta",
    {
      name: "twitter:title",
      content: title,
    },
  ]);

  descr &&
    pageData.frontmatter.head.push([
      "meta",
      {
        name: "twitter:description",
        content: descr,
      },
    ]);

  pageData.frontmatter.cover &&
    pageData.frontmatter.head.push([
      "meta",
      {
        name: "twitter:image",
        content: img,
      },
    ]);
}
