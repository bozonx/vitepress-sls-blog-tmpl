import fs from "fs";
import path from "path";
import { DEFAULT_ENCODE } from "../constants.js";
import { parseMdFile } from "./parseMdFile.js";
import { stripMd } from "./convertMd.js";

export function makePreviewItem(filePath) {
  const relativePath = path.relative(
    path.resolve(filePath, "../../../"),
    filePath,
  );

  const url = "/" + relativePath.replace(/\.md$/, "");
  const rawContent = fs.readFileSync(filePath, DEFAULT_ENCODE);
  const { frontmatter, content } = parseMdFile(rawContent);

  return {
    url,
    pubDate: frontmatter.pubDate,
    authorId: frontmatter.authorId,
    title: extractTitleFromMd(content),
    preview: resolvePreview(frontmatter, content),
    tags: frontmatter.tags,
    // TODO: make real thumbnail
    thumbnail: frontmatter.cover,
  };
}

function extractPreviewFromMd(mdContent) {
  const mdContentNoHeader = removeTitleFromMd(mdContent);
  const striped = stripMd(mdContentNoHeader);

  return striped.substring(0, 300);
}

function extractTitleFromMd(mdNoFrontmatter) {
  const firstTitleMatch = mdNoFrontmatter.match(/^\#\s+(.+)$/m);

  return firstTitleMatch ? firstTitleMatch[1].trim() : "";
}

function removeTitleFromMd(mdNoFrontmatter) {
  return mdNoFrontmatter.trim().replace(/^\#\s+.+/, "");
}

function resolvePreview(
  { previewText, descrAsPreview, description },
  mdContent,
) {
  if (previewText) {
    return previewText;
  } else if (descrAsPreview && description) {
    return description;
  }

  return extractPreviewFromMd(mdContent);
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

// const date = path.basename(path.dirname(filePath))
