import { Feed } from 'feed'
import fs from 'fs'
import path from 'path'
import { createContentLoader } from 'vitepress'

import { DEFAULT_ENCODE, POSTS_DIR } from '../constants.js'
import { parseMdFile } from '../helpers/mdWorks.js'
import {
  createPostGuid,
  formatTagsForRss,
  getFormatInfo,
  getRssFormats,
  truncateDescriptionForRss,
  validatePostForRss,
  validateRssConfig,
} from '../helpers/rssHelpers.js'
import {
  extractPreviewFromMd,
  resolvePreview,
} from '../page-helpers/makePreviewItem.js'

/**
 * Генерирует RSS и Atom feeds для всех локалей
 *
 * @param {Object} config - Конфигурация VitePress
 * @returns {Promise<void>}
 */
export async function generateRssFeed(config) {
  try {
    // Валидируем конфигурацию
    if (!validateRssConfig(config)) {
      throw new Error('Invalid RSS configuration')
    }

    const feeds = {}

    for (const localeIndex of Object.keys(config.site.locales)) {
      if (localeIndex === 'root') continue

      const locale = config.site.locales[localeIndex]
      const hostname = config.userConfig.hostname
      const siteUrl = `${hostname}/${localeIndex}`

      // Создаем базовый feed
      feeds[localeIndex] = new Feed({
        language: localeIndex,
        title: locale.title,
        description: locale.description,
        copyright: locale.themeConfig.footer.copyright,
        id: siteUrl,
        link: siteUrl,
        favicon: `${hostname}/img/favicon-32x32.png`,
        image: `${hostname}${config.userConfig.themeConfig.sidebarLogoSrc}`,
        generator: 'VitePress Blog Template',
        updated: new Date(),
        feedLinks: {
          rss: `${siteUrl}/feed-${localeIndex}.rss`,
          atom: `${siteUrl}/feed-${localeIndex}.atom`,
        },
      })

      try {
        const posts = await createContentLoader(
          `${localeIndex}/${POSTS_DIR}/*.md`,
          { includeSrc: true }
        ).load()

        // Сортируем посты по дате (новые сначала) и ограничиваем количество
        posts
          .sort(
            (a, b) =>
              +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
          )
          .slice(0, config.userConfig.themeConfig.maxPostsInRssFeed)

        for (const { url, frontmatter, src } of posts) {
          try {
            // Валидируем обязательные поля
            if (!validatePostForRss(frontmatter, url)) {
              continue
            }

            // Получаем описание поста
            let descr = resolvePreview(frontmatter)

            if (!descr) {
              const { content } = parseMdFile(src)
              const previewFromMd = extractPreviewFromMd(content)
              descr = previewFromMd
            }

            // Очищаем и обрезаем описание для RSS
            const cleanDescription = truncateDescriptionForRss(descr)

            // Создаем уникальный GUID для поста
            const guid = createPostGuid(hostname, url, frontmatter.date)

            // Подготавливаем категории из тегов
            const categories = formatTagsForRss(frontmatter.tags, hostname)

            // Добавляем пост в feed
            feeds[localeIndex].addItem({
              title: frontmatter.title,
              description: cleanDescription,
              id: guid,
              link: `${hostname}${url}`,
              date: frontmatter.date && new Date(frontmatter.date),
              image: frontmatter.cover && `${hostname}${frontmatter.cover}`,

              // TODO: review
              // Добавляем автора если есть
              author: frontmatter.author
                ? [
                    {
                      name: frontmatter.author,
                      email: frontmatter.authorEmail || '',
                      link: frontmatter.authorLink || '',
                    },
                  ]
                : undefined,
              // Добавляем категории
              category: categories.length > 0 ? categories : undefined,
              // Добавляем дополнительные поля
              published: frontmatter.date && new Date(frontmatter.date),
              // TODO: review
              updated:
                (frontmatter.updated && new Date(frontmatter.updated)) ||
                (frontmatter.date && new Date(frontmatter.date)),
            })
          } catch (postError) {
            console.error(`Error processing post ${url}:`, postError)
            continue
          }
        }
      } catch (loaderError) {
        console.error(
          `Error loading posts for locale ${localeIndex}:`,
          loaderError
        )
        continue
      }
    }

    // Получаем настройки форматов RSS из конфигурации
    const rssFormats = getRssFormats(config)

    // Генерируем файлы для каждой локали
    for (const localeIndex of Object.keys(feeds)) {
      try {
        const feedDir = path.join(config.outDir)

        // Генерируем файлы для каждого настроенного формата
        for (const format of rssFormats) {
          try {
            const formatInfo = getFormatInfo(format)
            const feedPath = path.join(
              feedDir,
              `feed-${localeIndex}.${formatInfo.extension}`
            )

            // Генерируем контент для выбранного формата
            const feedContent = formatInfo.generator(feeds[localeIndex])

            // Записываем файл
            fs.writeFileSync(feedPath, feedContent, DEFAULT_ENCODE)
            console.log(`Generated ${formatInfo.title}: ${feedPath}`)
          } catch (formatError) {
            console.error(
              `Error generating ${format} feed for locale ${localeIndex}:`,
              formatError
            )
          }
        }
      } catch (writeError) {
        console.error(
          `Error writing feeds for locale ${localeIndex}:`,
          writeError
        )
      }
    }

    console.log('RSS feed generation completed successfully')
  } catch (error) {
    console.error('Error generating RSS feeds:', error)
    throw error
  }
}
