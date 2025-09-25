import { defineConfig } from 'vitepress'
import { mergeBlogConfig } from 'vitepress-sls-blog-tmpl'

export default defineConfig(
  mergeBlogConfig({
    title: 'My Blog',
    description: 'A modern blog built with VitePress',
    hostname: 'https://myblog.com',
    repo: 'https://github.com/username/myblog',
    srcDir: './src',

    // Локализация
    locales: {
      root: { label: 'English', lang: 'en-US' },
      ru: { label: 'Русский', lang: 'ru-RU' },
    },

    themeConfig: {
      // ... другие настройки темы

      // Аналитика для популярных постов (build-time generation)
      analytics: {
        // Включить генерацию популярных постов во время сборки
        enabled: true, // Установите true для включения

        // Тип аналитики: 'google' или 'mock'
        type: 'mock', // Измените на нужный тип

        // Google Analytics настройки
        google: {
          enabled: false,
          version: 'ga4', // 'ga4' или 'ua'
          propertyId: null, // Например: '123456789'
          credentialsPath: null, // Например: './credentials/ga-service-account.json'
          dataPeriodDays: 30,
        },

        // Общие настройки
        sortBy: 'pageviews', // 'pageviews', 'uniquePageviews', 'avgTimeOnPage', 'bounceRate'
        popularPostsCount: 10,
        // Путь к выходному JSON файлу (относительно outDir)
        outputPath: 'popular-posts.json',
      },

      // Количество популярных постов для отображения
      popularPostsCount: 10,

      // ... остальные настройки
    },
  })
)
