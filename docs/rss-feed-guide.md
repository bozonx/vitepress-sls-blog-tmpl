# RSS Feed Guide

## Обзор

Система генерации RSS feed была значительно улучшена для соответствия современным стандартам и требованиям.

## Поддерживаемые форматы

Теперь генерируются три формата feed:

1. **RSS 2.0** (`feed-{locale}.rss`) - классический формат
2. **Atom 1.0** (`feed-{locale}.atom`) - современный XML формат
3. **JSON Feed 1.1** (`feed-{locale}.json`) - современный JSON формат

## Улучшения

### 1. Обработка ошибок

- Добавлена полная обработка ошибок с try-catch блоками
- Валидация конфигурации перед генерацией
- Пропуск некорректных постов с логированием

### 2. Валидация данных

- Проверка обязательных полей (title, date)
- Валидация формата даты
- Очистка HTML тегов из описаний

### 3. Дополнительные поля

- **Author** - информация об авторе
- **Categories** - теги как категории
- **Published/Updated** - даты публикации и обновления
- **GUID** - уникальные идентификаторы
- **Content** - полный контент (опционально)

### 4. Безопасность

- Экранирование специальных символов
- Удаление HTML тегов из описаний
- Валидация URL и путей

## Конфигурация

### Обязательные поля в frontmatter

```yaml
---
title: 'Заголовок поста'
date: '2024-01-15'
---
```

### Опциональные поля

```yaml
---
title: 'Заголовок поста'
date: '2024-01-15'
author: 'Имя автора'
authorEmail: 'author@example.com'
authorLink: 'https://example.com/author'
tags: ['tag1', 'tag2']
cover: '/img/post-cover.jpg'
previewText: 'Краткое описание поста'
includeContent: true # Включить полный контент в feed
updated: '2024-01-20' # Дата обновления
---
```

## Использование

### Автоматическая генерация

RSS feeds генерируются автоматически при сборке сайта:

```bash
npm run build
```

### Ручная генерация

```javascript
import { generateRssFeed } from './src/page-helpers/generateRssFeed.js'

const config = {
  site: {
    locales: {
      en: { title: 'Blog', description: 'My blog' },
      ru: { title: 'Блог', description: 'Мой блог' },
    },
  },
  userConfig: { hostname: 'https://example.com' },
  outDir: './dist',
}

await generateRssFeed(config)
```

## Структура файлов

```
dist/
├── feed-en.rss      # RSS 2.0 для английского
├── feed-en.atom     # Atom 1.0 для английского
├── feed-en.json     # JSON Feed для английского
├── feed-ru.rss      # RSS 2.0 для русского
├── feed-ru.atom     # Atom 1.0 для русского
└── feed-ru.json     # JSON Feed для русского
```

## Валидация

### Онлайн валидаторы

- **RSS**: https://validator.w3.org/feed/
- **Atom**: https://validator.w3.org/feed/ (поддерживает Atom)
- **JSON Feed**: https://jsonfeed.org/validator/

### Локальная валидация

```bash
# Проверка RSS
xmllint --noout feed-en.rss

# Проверка Atom
xmllint --noout feed-en.atom

# Проверка JSON
jq . feed-en.json
```

## Совместимость

### RSS читатели

- ✅ Feedly
- ✅ Inoreader
- ✅ NewsBlur
- ✅ NetNewsWire
- ✅ RSSOwl

### Платформы

- ✅ WordPress
- ✅ Medium
- ✅ Substack
- ✅ Ghost

## Логирование

Система предоставляет подробное логирование:

```
Generated RSS feed: /path/to/feed-en.rss
Generated Atom feed: /path/to/feed-en.atom
Generated JSON feed: /path/to/feed-en.json
RSS feed generation completed successfully
```

При ошибках:

```
Post /post/example.md validation failed: missing title, invalid date format
Error processing post /post/example.md: Error message
```

## Производительность

- Генерация происходит асинхронно
- Обработка ошибок не прерывает генерацию других постов
- Кэширование результатов для оптимизации

## Безопасность

- Валидация всех входных данных
- Экранирование специальных символов
- Проверка путей файлов
- Ограничение размера описаний

## Расширение

Для добавления новых полей или форматов:

1. Обновите `rssValidator.js` для валидации новых полей
2. Добавьте логику в `generateRssFeed.js`
3. Обновите документацию

## Поддержка

При возникновении проблем:

1. Проверьте логи сборки
2. Убедитесь в корректности frontmatter
3. Проверьте конфигурацию сайта
4. Используйте валидаторы для проверки выходных файлов
