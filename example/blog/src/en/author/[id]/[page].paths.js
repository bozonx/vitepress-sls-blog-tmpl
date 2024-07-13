import path from "path";
import { POSTS_DIR } from "vitepress-sls-blog-tmpl/src/constants.js";
import { makeAuthorsParams } from "vitepress-sls-blog-tmpl/src/helpers/makeListParams.js";
import { PROPS } from "../../../.vitepress/props.js";

const postsDirAbs = path.resolve(path.dirname(__filename), "../../", POSTS_DIR);

export default {
  paths() {
    return makeAuthorsParams(postsDirAbs, PROPS.perPage);
  },
};
