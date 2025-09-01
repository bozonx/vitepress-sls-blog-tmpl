# Канонические ссылки (Canonical Links)

## Быстрый старт

Добавьте параметр `canonical` с URL в frontmatter вашего markdown файла:

```yaml
---
title: 'Заголовок поста'
description: 'Описание поста'
date: 2024-01-15
canonical: "https://example.com/en/post/post-slug"  # ← URL канонической страницы
tags:
  - tag1
  - tag2
---
```

## Что происходит

Автоматически добавляется тег в HTML head:

```html
<link rel="canonical" href="https://example.com/en/post/post-slug" />
```

## Подробная документация

См. [docs/CANONICAL_LINKS.md](docs/CANONICAL_LINKS.md) для полного описания.

## Примеры

- [Тестовый пост с canonical](example/blog/src/en/post/test-canonical.md)
- [Тестовый пост без canonical](example/blog/src/en/post/test-no-canonical.md)
- [Тестовый пост с вариантами](example/blog/src/en/post/test-canonical-variants.md)

## Технические детали

- Функция: `addCanonicalLink` в `src/transformers/addCanonicalLink.js`
- Автоматически вызывается при сборке
- Работает только для страниц с языковым префиксом
- Пропускает корневые страницы
- Проверяет валидность указанного URL
- Каноническая ссылка указывает на указанный URL, а не на текущую страницу
