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
  const isHome = pageData.frontmatter.layout === "home";
  const title = isHome ? langConfig.title : pageData.title;
  const author =
    pageData.frontmatter.authorId &&
    langConfig.themeConfig.authors?.find(
      (item) => item.id === pageData.frontmatter.authorId,
    )?.name;
  const img =
    pageData.frontmatter.cover &&
    siteConfig.sitemap.hostname + pageData.frontmatter.cover;
  // const fileExtension = path.extname(pageData.relativePath); // Возвращает расширение (например, '.txt')
  // const url =
  //   siteConfig.sitemap.hostname +
  //   "/" +
  //   pageData.relativePath.substring(
  //     0,
  //     pageData.relativePath.length - fileExtension.length,
  //   );

  let descr = pageData.frontmatter.description;

  if (isHome) {
    // for home page get the main description
    descr = langConfig.description;
  } else if (pageData.frontmatter.date) {
    // means article
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

  // pageData.frontmatter.head.push([
  //   "meta",
  //   {
  //     name: "og:url",
  //     content: url,
  //   },
  // ]);

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

    author &&
      pageData.frontmatter.head.push([
        "meta",
        {
          name: "article:author",
          content: author,
        },
      ]);

    (pageData.frontmatter.tags || []).forEach((tag) => {
      pageData.frontmatter.head.push([
        "meta",
        {
          name: "article:tag",
          content: tag.name,
        },
      ]);
    });
  }

  if (img) {
    pageData.frontmatter.head.push([
      "meta",
      {
        name: "og:image",
        content: img,
      },
    ]);

    pageData.frontmatter.coverAlt &&
      pageData.frontmatter.head.push([
        "meta",
        {
          name: "og:image:alt",
          content: pageData.frontmatter.coverAlt,
        },
      ]);
  }

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

  img &&
    pageData.frontmatter.head.push([
      "meta",
      {
        name: "twitter:image",
        content: img,
      },
    ]);
}
