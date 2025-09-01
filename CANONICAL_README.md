# Канонические ссылки (Canonical Links)

## Быстрый старт

Добавьте параметр `canonical` в frontmatter вашего markdown файла:

### Вариант 1: Ссылка на другую страницу

```yaml
---
title: 'Заголовок поста'
description: 'Описание поста'
date: 2024-01-15
canonical: 'https://example.com/en/post/post-slug' # ← URL канонической страницы
tags:
  - tag1
  - tag2
---
```

### Вариант 2: Ссылка на саму страницу

```yaml
---
title: 'Заголовок поста'
description: 'Описание поста'
date: 2024-01-15
canonical: 'self' # ← Ссылка на саму страницу
tags:
  - tag1
  - tag2
---
```

### Вариант 3: Сокращенная версия

```yaml
---
title: 'Заголовок поста'
description: 'Описание поста'
date: 2024-01-15
canonical: 's' # ← Сокращенная версия "self"
tags:
  - tag1
  - tag2
---
```

## Что происходит

### С URL

Автоматически добавляется тег в HTML head:

```html
<link rel="canonical" href="https://example.com/en/post/post-slug" />
```

### С self/s

Автоматически генерируется URL текущей страницы и добавляется тег:

```html
<link rel="canonical" href="https://example.com/en/post/current-page" />
```

## Подробная документация

См. [docs/CANONICAL_LINKS.md](docs/CANONICAL_LINKS.md) для полного описания.

## Примеры

- [Тестовый пост с canonical URL](example/blog/src/en/post/test-canonical.md)
- [Тестовый пост с canonical: "self"](example/blog/src/en/post/test-canonical-self.md)
- [Тестовый пост с canonical: "s"](example/blog/src/en/post/test-canonical-s.md)
- [Тестовый пост без canonical](example/blog/src/en/post/test-no-canonical.md)
- [Тестовый пост с вариантами](example/blog/src/en/post/test-canonical-variants.md)

## Технические детали

- Функция: `addCanonicalLink` в `src/transformers/addCanonicalLink.js`
- Автоматически вызывается при сборке
- Работает только для страниц с языковым префиксом
- Пропускает корневые страницы
- Проверяет валидность указанного URL
- При `"self"` или `"s"` генерирует URL текущей страницы
- При указании URL использует его как есть
