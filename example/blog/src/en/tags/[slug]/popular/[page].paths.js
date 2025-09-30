import { makeTagsParams } from "vitepress-sls-blog-tmpl/makeListParams.js";
import { PER_PAGE } from "../../../../.vitepress/config.js";
import getAllPosts from "../../../getAllPosts.js";

export default {
  async paths() {
    return makeTagsParams(await getAllPosts(), PER_PAGE);
  },
};
