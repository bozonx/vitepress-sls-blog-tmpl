import path from "path";
import { loadPostsData } from "vitepress-sls-blog-tmpl/loadPosts.js";

const localeDir = path.dirname(import.meta.url.replace("file://", ""));
const config = globalThis.VITEPRESS_CONFIG;

export default function () {
  return loadPostsData(localeDir, config);
}
