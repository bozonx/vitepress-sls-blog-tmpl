import fs from 'fs'
import path from 'path'
import { generateRssFeed } from './generateRssFeed.js'
import { validateRssConfig } from './rssValidator.js'

/**
 * Тестовый файл для проверки RSS генерации Запуск: node
 * src/page-helpers/test-rss.js
 */

// Тестовая конфигурация
const testConfig = {
  site: {
    locales: {
      en: {
        title: 'Test Blog',
        description: 'A test blog for RSS validation',
        themeConfig: { footer: { copyright: '© 2024 Test Blog' } },
      },
      ru: {
        title: 'Тестовый блог',
        description: 'Тестовый блог для валидации RSS',
        themeConfig: { footer: { copyright: '© 2024 Тестовый блог' } },
      },
    },
  },
  userConfig: {
    hostname: 'https://example.com',
    themeConfig: { sidebarLogoSrc: '/img/logo.png' },
  },
  outDir: './test-output',
}

/** Тестирует валидацию конфигурации */
function testConfigValidation() {
  console.log('Testing configuration validation...')

  const isValid = validateRssConfig(testConfig)
  console.log('Configuration validation:', isValid ? 'PASSED' : 'FAILED')

  return isValid
}

/** Тестирует генерацию RSS feed */
async function testRssGeneration() {
  console.log('Testing RSS feed generation...')

  try {
    await generateRssFeed(testConfig)
    console.log('RSS generation: PASSED')
    return true
  } catch (error) {
    console.error('RSS generation: FAILED', error.message)
    return false
  }
}

/** Проверяет созданные файлы */
function checkGeneratedFiles() {
  console.log('Checking generated files...')

  const expectedFiles = [
    'feed-en.rss',
    'feed-en.atom',
    'feed-en.json',
    'feed-ru.rss',
    'feed-ru.atom',
    'feed-ru.json',
  ]

  let allFilesExist = true

  for (const file of expectedFiles) {
    const filePath = path.join(testConfig.outDir, file)
    const exists = fs.existsSync(filePath)
    console.log(`${file}: ${exists ? 'EXISTS' : 'MISSING'}`)

    if (exists) {
      const stats = fs.statSync(filePath)
      console.log(`  Size: ${stats.size} bytes`)
    }

    if (!exists) allFilesExist = false
  }

  return allFilesExist
}

/** Основная функция тестирования */
async function runTests() {
  console.log('=== RSS Feed Testing ===\n')

  const configTest = testConfigValidation()
  console.log()

  if (configTest) {
    const generationTest = await testRssGeneration()
    console.log()

    if (generationTest) {
      const filesTest = checkGeneratedFiles()
      console.log()

      console.log('=== Test Results ===')
      console.log(`Configuration: ${configTest ? 'PASSED' : 'FAILED'}`)
      console.log(`Generation: ${generationTest ? 'PASSED' : 'FAILED'}`)
      console.log(`Files: ${filesTest ? 'PASSED' : 'FAILED'}`)

      if (configTest && generationTest && filesTest) {
        console.log(
          '\n🎉 All tests passed! RSS feed generation is working correctly.'
        )
      } else {
        console.log('\n❌ Some tests failed. Please check the output above.')
      }
    }
  } else {
    console.log(
      '❌ Configuration validation failed. Cannot proceed with generation test.'
    )
  }
}

// Запускаем тесты если файл выполняется напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error)
}

export { runTests, testConfig }
