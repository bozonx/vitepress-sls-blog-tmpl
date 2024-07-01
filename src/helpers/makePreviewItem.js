import fs from "fs";
import path from "path";
import { DEFAULT_ENCODE } from "../constants.js";
import { parseMdFile } from "./parseMdFile.js";

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
    title: extractTitleFromMd(content),
    preview: resolvePreview(frontmatter, content),
    tags: frontmatter.tags,
  };
}

function extractPreviewFromMd(mdContent) {
  const mdContentNoHeader = removeTitleFromMd(mdContent);
  // TODO: do it - сделать более умную обрезку. очистить md

  return mdContentNoHeader.substring(0, 150);
}

function extractTitleFromMd(mdNoFrontmatter) {
  const firstTitleMatch = mdNoFrontmatter.match(/^\#\s+(.+)$/m);

  return firstTitleMatch ? firstTitleMatch[1].trim() : "";
}

function removeTitleFromMd(mdNoFrontmatter) {
  return mdNoFrontmatter.trim().replace(/^\#\s+.+/, "");
}

function resolvePreview({ previewText, description }, mdContent) {
  if (previewText === false || String(previewText)?.trim() === "false") {
    return extractPreviewFromMd(mdContent);
  } else if (previewText === true || String(previewText)?.trim() === "true") {
    return description || extractPreviewFromMd(mdContent);
  } else if (previewText) {
    return previewText;
  } else if (description) {
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
