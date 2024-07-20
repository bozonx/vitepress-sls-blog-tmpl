import path from "path";
import { POSTS_DIR } from "vitepress-sls-blog-tmpl/constants.js";
import { makeRecentParams } from "vitepress-sls-blog-tmpl/makeListParams.js";
import { PROPS } from "../../.vitepress/props.js";

const postsDirAbs = path.resolve(path.dirname(__filename), "../", POSTS_DIR);

export default {
  paths() {
    return makeRecentParams(postsDirAbs, PROPS.perPage);
  },
};
