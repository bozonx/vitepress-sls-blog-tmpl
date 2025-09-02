import { POSTS_DIR } from '../constants.js'

const POSTS_DIR_REGEXP = new RegExp(`^\\w+\/(${POSTS_DIR}|page)`)

export function filterSitemap(items) {
  return (
    items
      .filter((item) => {
        if (!item.url || !item.links) return false
        else if (item.url.startsWith('/')) return false
        // index page
        else if (item.url.match(/^\w+\/$/)) return true
        // posts and pages
        else if (POSTS_DIR_REGEXP.test(item.url)) return true
        else return false
      })
      // remove innecesary root link of index pages
      .map((item) => {
        // only for index pages line ru/, en/
        if (item.url.indexOf('/') === item.url.length - 1) {
          return {
            ...item,
            // remove empty url which is means the root
            links: item.links.filter((item) => item.url),
          }
        } else return item
      })
  )
}
