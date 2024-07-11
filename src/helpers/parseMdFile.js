import grayMatter from "gray-matter";

export function parseMdFile(rawContent) {
  const { data, content } = grayMatter(rawContent);

  return {
    frontmatter: data,
    content,
  };
}
