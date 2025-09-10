import { makeAuthorsParams } from "vitepress-sls-blog-tmpl/makeListParams.js";
import { PROPS } from "../../../.vitepress/props.js";
import getCachedPosts from "../../cachedPosts.js";

export default {
  async paths() {
    return makeAuthorsParams(await getCachedPosts(), PROPS.perPage);
  },
};
