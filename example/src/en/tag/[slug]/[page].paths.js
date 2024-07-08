import path from 'path'
import { POSTS_DIR } from 'vitepress-sls-blog-tmpl/src/constants.js'
import { makeTagsParams } from 'vitepress-sls-blog-tmpl/src/helpers/makeListParams.js'
import { commonParams } from '../../../.vitepress/themeLocaleconfig.js'


const langDir = path.resolve(path.dirname(__filename), '../../')
const postsDirAbs = path.join(langDir, POSTS_DIR)
const lang = path.basename(langDir) 


export default {
  paths() {
    return makeTagsParams(postsDirAbs, commonParams.perPage, lang)
  }
}

