import { POSTS_DIR } from "vitepress-sls-blog-tmpl/constants.js";
import getCachedPosts from "./cachedPosts.js";

export default {
  watch: [`./${POSTS_DIR}/*.md`],
  async load(watchedFiles) {
    return {
      posts: await getCachedPosts(
        watchedFiles,
        process.env.NODE_ENV !== "production"
      ),
    };
  },
};
