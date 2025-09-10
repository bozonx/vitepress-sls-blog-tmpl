import fs from 'fs/promises'
import path from 'path'
import { makePreviewItem } from './makePreviewItem.js'
import { POSTS_DIR } from '../constants.js'

if (!global.blogCache) {
  global.blogCache = {}
}

/**
 * Загружает все посты из директории postsDir
 *
 * @param {string} localeDir - Путь к директории локали
 * @param {boolean} ignoreCache - Если true, игнорирует кэш и перечитывает посты
 * @returns {Promise<Array>} Массив обработанных постов
 */
export async function loadPosts(localeDir, ignoreCache = false) {
  // Извлекаем localIndex из пути (последний элемент пути)
  const localIndex = path.basename(localeDir)

  // Проверяем глобальный кэш для текущей локали
  if (
    global.blogCache[localIndex] &&
    global.blogCache[localIndex].length > 0 &&
    !ignoreCache
  ) {
    return global.blogCache[localIndex]
  }

  try {
    const postsDir = path.join(localeDir, POSTS_DIR)
    const files = await fs.readdir(postsDir)
    const mdFiles = files.filter((file) => file.endsWith('.md'))
    const fullPaths = mdFiles.map((file) => path.join(postsDir, file))
    const posts = fullPaths.map((filePath) => makePreviewItem(filePath))
    // Сохраняем в глобальный кэш для текущей локали
    global.blogCache[localIndex] = posts

    console.log(`\n...Loaded ${posts.length} posts from ${postsDir}`)

    return posts
  } catch (error) {
    throw new Error(`Error loading posts for locale ${localIndex}:`, error)
  }
}
