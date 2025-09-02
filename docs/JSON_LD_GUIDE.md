# JSON-LD Guide

Это руководство объясняет, как использовать JSON-LD трансформер для генерации структурированных данных на основе YAML.

## Что такое JSON-LD?

JSON-LD (JavaScript Object Notation for Linked Data) - это формат для представления структурированных данных в JSON. Это помогает поисковым системам лучше понимать содержимое ваших страниц.

## Как использовать

### 1. Добавьте параметр в frontmatter

В frontmatter вашей Markdown страницы добавьте параметр `jsonLd`:

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

Трансформер поддерживает следующие поля:

- **`"@type"`** - Тип страницы/контента (например, `WebPage`, `Article`, `BlogPosting`)
- **`name`** - Название страницы
- **`url`** - URL страницы
- **`description`** - Описание страницы
- **`isPartOf`** - Информация о родительском сайте (может быть объектом или массивом)

### 3. Важное примечание о YAML синтаксисе

**Поля, начинающиеся с `@`, должны быть в кавычках:**

```yaml
"@type": WebPage    # Правильно
@type: WebPage      # Неправильно - вызовет ошибку парсинга
```

### 4. Примеры использования

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

#### Статья блога

```yaml
jsonLd: |
  "@type": Article
  name: How to Use JSON-LD
  url: https://example.com/blog/json-ld-guide
  description: Complete guide to implementing JSON-LD
  isPartOf:
    "@type": Blog
    name: Tech Blog
    url: https://example.com/blog
```

#### Страница с множественными родителями

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
    - "@type": NewsSite
      name: News Portal
      url: https://news.example.com
```

## Как это работает

1. Трансформер проверяет наличие `jsonLd` в frontmatter
2. Парсит YAML в JavaScript объект
3. Создает JSON-LD структуру с базовым контекстом
4. Добавляет поддерживаемые поля
5. Сохраняет результат в `frontmatter.jsonLdData`

## Обработка ошибок

Если в YAML есть ошибки, трансформер:

- Выводит предупреждение в консоль
- Создает базовую JSON-LD структуру с типом `WebPage`
- Продолжает работу без прерывания

## Интеграция с VitePress

Трансформер автоматически вызывается в цепочке трансформации страниц. Результат доступен в компонентах через `$frontmatter.jsonLdData`.

## Лучшие практики

1. **Используйте правильные типы** - выбирайте наиболее подходящий тип для вашего контента
2. **Обеспечьте уникальность URL** - каждый URL должен быть уникальным
3. **Добавляйте описания** - подробные описания помогают поисковым системам
4. **Проверяйте валидность** - используйте инструменты Google для проверки структурированных данных
5. **Используйте кавычки для @ полей** - обязательно заключайте в кавычки поля, начинающиеся с `@`

## Полезные ссылки

- [Schema.org](https://schema.org/) - Справочник по типам и свойствам
- [Google Rich Results Test](https://search.google.com/test/rich-results) - Тестирование структурированных данных
- [JSON-LD Specification](https://json-ld.org/) - Спецификация формата
