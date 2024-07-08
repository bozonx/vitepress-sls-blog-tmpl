import grayMatter from "gray-matter";
import { remark } from "remark";
import strip from "strip-markdown";
import remarkHtml from "remark-html";

export function parseMdFile(rawContent) {
  const { data, content } = grayMatter(rawContent);

  return {
    frontmatter: data,
    content,
  };
}

export function stripMd(mdContent) {
  return remark().use(strip).processSync(mdContent).toString();
}

export function mdToHtml(mdContent) {
  return remark().use(remarkHtml).processSync(mdContent).toString();
}
