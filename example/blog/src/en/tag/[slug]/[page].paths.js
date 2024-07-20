import path from "path";
import { POSTS_DIR } from "vitepress-sls-blog-tmpl/constants.js";
import { makeTagsParams } from "vitepress-sls-blog-tmpl/makeListParams.js";
import { PROPS } from "../../../.vitepress/props.js";

const langDir = path.resolve(path.dirname(__filename), "../../");
const postsDirAbs = path.join(langDir, POSTS_DIR);
const lang = path.basename(langDir);

export default {
  paths() {
    return makeTagsParams(postsDirAbs, PROPS.perPage, lang);
  },
};
