# JSON-LD Transformer для VitePress

Этот проект добавляет возможность генерации JSON-LD структурированных данных на основе YAML в frontmatter страниц VitePress.

## 🚀 Возможности

- **Автоматическая генерация JSON-LD** из YAML данных
- **Поддержка основных полей**: `@type`, `name`, `url`, `description`, `isPartOf`
- **Гибкая структура**: поддержка как одиночных объектов, так и массивов
- **Обработка ошибок**: graceful fallback при некорректных данных
- **Интеграция с VitePress**: автоматический вызов в цепочке трансформации

## 📦 Установка

Трансформер уже интегрирован в проект и автоматически вызывается для всех страниц.

## 🔧 Использование

### 1. Добавьте YAML данные в frontmatter

```yaml
---
title: My Page
description: Page description
jsonLd: |
  "@type": WebPage
  name: My Page
  url: https://example.com/my-page
  description: This is my page
  isPartOf:
    "@type": WebSite
    name: My Website
    url: https://example.com
---
```

### 2. Поддерживаемые поля

| Поле          | Описание              | Пример                              |
| ------------- | --------------------- | ----------------------------------- |
| `"@type"`     | Тип страницы/контента | `WebPage`, `Article`, `BlogPosting` |
| `name`        | Название страницы     | `"About Us"`                        |
| `url`         | URL страницы          | `https://example.com/about`         |
| `description` | Описание страницы     | `"Learn more about our company"`    |
| `isPartOf`    | Родительский сайт     | Объект или массив объектов          |

### 3. Примеры использования

#### Простая страница

```yaml
jsonLd: |
  "@type": WebPage
  name: About Us
  url: https://example.com/about
  description: Learn more about our company
  isPartOf:
    "@type": WebSite
    name: Company Website
    url: https://example.com
```

#### Статья с множественными родителями

```yaml
jsonLd: |
  "@type": Article
  name: Cross-Platform Article
  url: https://example.com/article
  description: Article published on multiple platforms
  isPartOf:
    - "@type": WebSite
      name: Main Site
      url: https://example.com
    - "@type": Blog
      name: Blog Platform
      url: https://example.com/blog
```

## ⚠️ Важные замечания

### YAML синтаксис

**Поля, начинающиеся с `@`, должны быть в кавычках:**

```yaml
"@type": WebPage    # ✅ Правильно
@type: WebPage      # ❌ Неправильно - вызовет ошибку
```

### Структура данных

- `isPartOf` может быть как объектом, так и массивом объектов
- Все URL должны быть абсолютными
- Описания должны быть информативными

## 🧪 Тестирование

### Компонент JsonLdDisplay

Для демонстрации сгенерированных данных используйте компонент `JsonLdDisplay`:

```vue
<template>
  <JsonLdDisplay :jsonLdData="$frontmatter.jsonLdData" />
</template>

<script setup>
import JsonLdDisplay from '../components/JsonLdDisplay.vue'
</script>
```

### Google Rich Results Test

Используйте [Google Rich Results Test](https://search.google.com/test/rich-results) для проверки корректности структурированных данных.

## 🔍 Как это работает

1. **Проверка**: Трансформер проверяет наличие `jsonLd` в frontmatter
2. **Парсинг**: YAML парсится в JavaScript объект
3. **Валидация**: Проверяется корректность структуры данных
4. **Генерация**: Создается JSON-LD структура с базовым контекстом
5. **Сохранение**: Результат сохраняется в `frontmatter.jsonLdData`

## 🛡️ Обработка ошибок

При ошибках в YAML:

- Выводится предупреждение в консоль
- Создается базовая JSON-LD структура
- Работа продолжается без прерывания

## 📁 Структура файлов

```
src/
├── transformers/
│   └── yamlToJsonLd.js          # Основной трансформер
├── components/
│   ├── JsonLdDisplay.vue        # Компонент отображения
│   └── README.md                # Документация компонента
└── docs/
    └── JSON_LD_GUIDE.md        # Подробное руководство
```

## 🎯 Лучшие практики

1. **Выбирайте правильные типы** - используйте наиболее подходящий тип для вашего контента
2. **Обеспечивайте уникальность URL** - каждый URL должен быть уникальным
3. **Добавляйте описания** - подробные описания помогают поисковым системам
4. **Проверяйте валидность** - используйте инструменты Google для проверки
5. **Используйте кавычки для @ полей** - обязательно заключайте в кавычки

## 🔗 Полезные ссылки

- [Schema.org](https://schema.org/) - Справочник по типам и свойствам
- [Google Rich Results Test](https://search.google.com/test/rich-results) - Тестирование структурированных данных
- [JSON-LD Specification](https://json-ld.org/) - Спецификация формата
- [VitePress Documentation](https://vitepress.dev/) - Документация VitePress

## 📝 Лицензия

Проект распространяется под той же лицензией, что и основной проект.
