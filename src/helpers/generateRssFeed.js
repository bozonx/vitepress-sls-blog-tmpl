import path from "path";
import fs from "fs";
import { Feed } from "feed";
import { createContentLoader } from "vitepress";
import { POSTS_DIR, DEFAULT_ENCODE } from "../constants.js";
import { parseMdFile } from "./parseMdFile.js";
import { resolvePreview, extractPreviewFromMd } from "./makePreviewItem.js";

export async function generateRssFeed(config) {
  const feeds = {};

  for (const localeIndex of Object.keys(config.site.locales)) {
    if (localeIndex === "root") continue;

    const locale = config.site.locales[localeIndex];
    const hostname = config.userConfig.hostname;
    const siteUrl = `${hostname}/${localeIndex}`;

    feeds[localeIndex] = new Feed({
      language: localeIndex,
      title: locale.title,
      description: locale.description,
      copyright: locale.themeConfig.footer.copyright,
      id: siteUrl,
      link: siteUrl,
      favicon: `${hostname}/img/favicon-32x32.png`,
      image: `${hostname}${config.userConfig.themeConfig.sidebarLogoSrc}`,
    });

    const posts = await createContentLoader(
      `${localeIndex}/${POSTS_DIR}/*.md`,
      { includeSrc: true },
    ).load();

    posts.sort(
      (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date),
    );

    for (const { url, frontmatter, src } of posts) {
      const { content } = parseMdFile(src);
      const previewFromMd = extractPreviewFromMd(content);
      let descr = resolvePreview(frontmatter) || previewFromMd;

      feeds[localeIndex].addItem({
        title: frontmatter.title,
        description: descr,
        id: `${hostname}${url}`,
        link: `${hostname}${url}`,
        date: frontmatter.date && new Date(frontmatter.date),
        image: frontmatter.cover && `${hostname}${frontmatter.cover}`,

        category: "test",
      });
    }
  }

  for (const localeIndex of Object.keys(feeds)) {
    fs.writeFileSync(
      path.join(config.outDir, `feed-${localeIndex}.rss`),
      feeds[localeIndex].rss2(),
      DEFAULT_ENCODE,
    );
  }
}
