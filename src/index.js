import 'vitepress/dist/client/theme-default/styles/components/custom-block.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
// see https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/components/vp-doc.css
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import './vp-common.css'
import './vp-icons.css'
import './styles.css'

import Layout from './LayoutIndex.vue'

// Экспортируем функции для работы с изображениями
export {
  getImageSize,
  isSupportedImageType,
  getAspectRatioInfo,
} from './helpers/imageHelpers.js'

export default { Layout }
