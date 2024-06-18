import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";
import { DEFAULT_ENCODE } from "../constants.js";

export function makePreviewItem(filePath) {
  // const date = path.basename(path.dirname(filePath))
  const relativePath = path.relative(
    path.resolve(filePath, "../../../"),
    filePath,
  );

  const url = "/" + relativePath.replace(/\.md$/, "");
  const rawContent = fs.readFileSync(filePath, DEFAULT_ENCODE);
  const { meta, title, preview } = parseMdFile(rawContent);

  return {
    url,
    pubDate: meta.pubDate,
    title,
    preview,
    tags: meta.tags,
  };
}

export function parseMdFile(rawContent) {
  const { data, content } = grayMatter(rawContent);
  const mdContentNoHeader = removeTitleFromMd(content);
  const extractedDescr = extractPreviewFromMd(mdContentNoHeader);
  // TODO: нафиг нужен previewText
  const preview =
    data.previewText || data.description || data.extractedPreview || "";

  return {
    // frontmatter
    meta: data,
    // extracted title
    title: extractTitleFromMd(content),
    // resolved preview
    preview,
    // only md content without frontmatter
    mdContent: content,
    // content without h1 header
    mdContentNoHeader,
    // description which is extracted from text
    extractedDescr,
  };
}

export function extractTitleFromMd(mdNoFrontmatter) {
  const firstTitleMatch = mdNoFrontmatter.match(/^\#\s+(.+)$/m);

  return firstTitleMatch ? firstTitleMatch[1].trim() : "";
}

export function removeTitleFromMd(mdNoFrontmatter) {
  return mdNoFrontmatter.trim().replace(/^\#\s+.+/, "");
}

export function extractPreviewFromMd(onlyMdContentNoHeader) {
  // TODO: do it - сделать более умную обрезку

  return onlyMdContentNoHeader.substring(0, 150);
}

// export function extractImageFromMd(rawData) {
//   const firstImgMatch = removeFrontmatter(rawData.src).match(/\!\[[^\]]*\]\(([^\)]+)\)/)
//
//   return (firstImgMatch) ? firstImgMatch[1] : null
// }

// export function removeFrontmatter(rawMd) {
//   const frontmatterRegex = /^---\n([\s\S]*?)\n---/
//
//   return rawMd.replace(frontmatterRegex, '')
// }
