import { makeMonthsParams } from "vitepress-sls-blog-tmpl/makeListParams.js";
import getCachedPosts from "../../../cachedPosts.js";

export default {
  async paths() {
    return makeMonthsParams(await getCachedPosts());
  },
};
