import { makePreviewItem } from "vitepress-sls-blog-tmpl/src/helpers/makePreviewItem.js";
import { POSTS_DIR } from "vitepress-sls-blog-tmpl/src/constants.js";

export default {
  watch: [`./${POSTS_DIR}/*.md`],
  load(watchedFiles) {
    return {
      posts: watchedFiles.map((item) => makePreviewItem(item)),
    };
  },
};
