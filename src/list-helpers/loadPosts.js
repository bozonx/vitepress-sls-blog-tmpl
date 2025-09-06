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
    // Формируем путь к директории с постами
    const postsDir = path.join(localeDir, POSTS_DIR)

    // Читаем все файлы из директории postsDir
    const files = await fs.readdir(postsDir)
    // Фильтруем только .md файлы
    const mdFiles = files.filter((file) => file.endsWith('.md'))
    // Создаем полные пути к файлам
    const fullPaths = mdFiles.map((file) => path.join(postsDir, file))
    // Обрабатываем каждый файл через makePreviewItem
    const posts = fullPaths.map((filePath) => makePreviewItem(filePath))
    // Сохраняем в глобальный кэш для текущей локали
    global.blogCache[localIndex] = posts

    console.log(`\n...Loaded ${posts.length} posts from ${postsDir}`)

    return posts
  } catch (error) {
    throw new Error(`Error loading posts for locale ${localIndex}:`, error)
  }
}
