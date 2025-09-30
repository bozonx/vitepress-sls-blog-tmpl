import { makeMonthsParams } from "vitepress-sls-blog-tmpl/makeListParams.js";
import getAllPosts from "../../../getAllPosts.js";

export default {
  async paths() {
    return makeMonthsParams(await getAllPosts());
  },
};
