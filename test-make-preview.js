import { makePreviewItem } from './src/list-helpers/makePreviewItem.js'
import path from 'path'

async function testMakePreviewItem() {
  try {
    console.log('Тестируем makePreviewItem...')

    // Создаем тестовый путь к файлу
    const testFilePath = path.join(process.cwd(), 'test-post.md')

    // Создаем тестовый markdown файл
    const testContent = `---
title: Test Post
date: 2024-01-01
cover: /img/test-image.jpg
---

# Test Post

This is a test post content.
`

    // Записываем тестовый файл
    const fs = await import('fs')
    fs.writeFileSync(testFilePath, testContent)

    try {
      const result = await makePreviewItem(testFilePath)
      console.log('Результат makePreviewItem:', {
        title: result.title,
        thumbnail: result.thumbnail,
        thumbnailWidth: result.thumbnailWidth,
        thumbnailHeight: result.thumbnailHeight,
      })
    } catch (error) {
      console.log(
        'Ожидаемая ошибка (файл изображения не существует):',
        error.message
      )
    }

    // Удаляем тестовый файл
    fs.unlinkSync(testFilePath)
  } catch (error) {
    console.error('Ошибка в тесте:', error)
  }
}

testMakePreviewItem()
