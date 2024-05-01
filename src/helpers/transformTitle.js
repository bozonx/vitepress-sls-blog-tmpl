import lodashTemplate from 'lodash.template'


export function transformTitle(pageData, ctx) {
  const langIndex = pageData.filePath.split('/')[0]

  if (!langIndex) {
    console.warn(`Can't recognize language`)

    return
  }

  const options = {
    theme: ctx.siteConfig.site.locales.ru.themeConfig,
    params: pageData.params,
  }
   
  pageData.title = lodashTemplate(
    pageData.title,
    { interpolate: /{{([\s\S]+?)}}/g }
  )(options)
}

