import { makeYearPostsParams } from "vitepress-sls-blog-tmpl/makeListParams.js";
import { PROPS } from "../../../.vitepress/props.js";
import getCachedPosts from "../../cachedPosts.js";

export default {
  async paths() {
    return makeYearPostsParams(await getCachedPosts(), PROPS.perPage);
  },
};
