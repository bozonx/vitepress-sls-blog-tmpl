import path from "path";
import { POSTS_DIR } from "vitepress-sls-blog-tmpl/constants.js";
import { loadPostsData } from "vitepress-sls-blog-tmpl/loadPosts.js";

const config = globalThis.VITEPRESS_CONFIG;
const localeDir = path.dirname(import.meta.url.replace("file://", ""));

export default {
  watch: [`./${POSTS_DIR}/*.md`],
  async load(watchedFiles) {
    return {
      posts: await loadPostsData(
        localeDir,
        config,
        process.env.NODE_ENV !== "production"
      ),
    };
  },
};
