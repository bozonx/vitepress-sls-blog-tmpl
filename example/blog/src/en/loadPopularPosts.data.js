import { POSTS_DIR } from "vitepress-sls-blog-tmpl/constants.js";
import getPopularPosts from "./getPopularPosts.js";

export default {
  watch: [`./${POSTS_DIR}/*.md`],
  async load(watchedFiles) {
    return {
      posts: await getPopularPosts(
        watchedFiles,
        process.env.NODE_ENV !== "production"
      ),
    };
  },
};
