/**
 * Add OpenGraph metatags to the page
 */
export function addOgMetaTags(pageData, { siteConfig }) {
  // skip root index.md
  if (pageData.filePath.indexOf("/") < 0) return;

  const langIndex = pageData.filePath.split("/")[0];
  const langConfig = siteConfig.site.locales[langIndex];
  console.log(111, pageData, langConfig);

  pageData.frontmatter.head ??= [];

  pageData.frontmatter.head.push([
    "meta",
    {
      name: "og:site_name",
      content: langConfig.title,
    },
  ]);

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
  }

  pageData.frontmatter.head.push([
    "meta",
    {
      name: "og:title",
      content:
        pageData.frontmatter.layout === "home"
          ? langConfig.title
          : `${pageData.title} | ${langConfig.title}`,
    },
  ]);

  // TODO: взять кусочек если нет descr
  pageData.frontmatter.description &&
    pageData.frontmatter.head.push([
      "meta",
      {
        name: "og:description",
        content: pageData.frontmatter.description,
      },
    ]);
}
