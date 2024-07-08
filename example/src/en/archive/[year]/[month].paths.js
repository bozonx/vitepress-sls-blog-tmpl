import path from 'path'
import { POSTS_DIR } from 'vitepress-sls-blog-tmpl/src/constants.js'
import { makeMonthsParams } from 'vitepress-sls-blog-tmpl/src/helpers/makeListParams.js'


const postsDirAbs = path.resolve(path.dirname(__filename), '../../', POSTS_DIR)


export default {
  paths() {
    return makeMonthsParams(postsDirAbs)
  }
}

