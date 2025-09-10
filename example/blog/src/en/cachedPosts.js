import path from "path";
import { loadPosts } from "vitepress-sls-blog-tmpl/loadPosts.js";

const localeDir = path.dirname(import.meta.url.replace("file://", ""));

export default async function (ignoreCache = false) {
  const posts = await loadPosts(localeDir, ignoreCache);

  return posts;
}
