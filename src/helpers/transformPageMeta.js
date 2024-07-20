import { POSTS_DIR } from "../constants.js";
import { mdToHtml } from "./convertMd.js";
import { transliterate } from "../helpers/transliterate.js";

/**
 * Transform md in frontmatter params to html.
 * And resolve preview
 */
export function transformPageMeta(pageData, ctx) {
  const regex = new RegExp(`^\\w{2,}\\/${POSTS_DIR}\\/.+`);
  // skip not posts
  if (!pageData.filePath.match(regex)) return;

  pageData.frontmatter.coverDescr = mdToHtml(pageData.frontmatter.coverDescr)
    .replace(/^\<p\>/, "")
    .replace(/\<\/p\>$/, "");

  pageData.frontmatter.tags = pageData.frontmatter.tags?.map((item) => ({
    name: item,
    slug: transliterate(item),
  }));
}
