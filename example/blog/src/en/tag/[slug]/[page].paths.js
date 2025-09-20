import { makeTagsParams } from "vitepress-sls-blog-tmpl/makeListParams.js";
import { PER_PAGE } from "../../../.vitepress/config.js";
import getCachedPosts from "../../cachedPosts.js";

export default {
  async paths() {
    return makeTagsParams(await getCachedPosts(), PER_PAGE);
  },
};
