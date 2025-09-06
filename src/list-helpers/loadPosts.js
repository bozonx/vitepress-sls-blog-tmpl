import fs from 'fs/promises'
import path from 'path'
import { makePreviewItem } from './makePreviewItem.js'

/**
 * Загружает все посты из директории postsDir
 *
 * @param {boolean} ignoreCache - Если true, игнорирует кэш и перечитывает посты
 * @returns {Promise<Array>} Массив обработанных постов
 */
export async function loadPosts(postsDir) {
  try {
    // Читаем все файлы из директории postsDir
    const files = await fs.readdir(postsDir)
    // Фильтруем только .md файлы
    const mdFiles = files.filter((file) => file.endsWith('.md'))
    // Создаем полные пути к файлам
    const fullPaths = mdFiles.map((file) => path.join(postsDir, file))
    // Обрабатываем каждый файл через makePreviewItem
    const posts = fullPaths.map((filePath) => makePreviewItem(filePath))

    console.log(`\n...Loaded ${posts.length} posts from ${postsDir}`)

    return posts
  } catch (error) {
    throw new Error('Error loading posts:', error)
  }
}
