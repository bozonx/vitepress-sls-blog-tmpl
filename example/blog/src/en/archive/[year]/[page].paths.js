import { makeYearPostsParams } from "vitepress-sls-blog-tmpl/makeListParams.js";
import { PER_PAGE } from "../../../.vitepress/config.js";
import getCachedPosts from "../../cachedPosts.js";

export default {
  async paths() {
    return makeYearPostsParams(await getCachedPosts(), PER_PAGE);
  },
};
