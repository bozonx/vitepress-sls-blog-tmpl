import path from "path";
import { POSTS_DIR } from "vitepress-sls-blog-tmpl/constants.js";
import { makeYearsParams } from "vitepress-sls-blog-tmpl/makeListParams.js";

const postsDirAbs = path.resolve(path.dirname(__filename), "../", POSTS_DIR);

export default {
  paths() {
    return makeYearsParams(postsDirAbs);
  },
};
