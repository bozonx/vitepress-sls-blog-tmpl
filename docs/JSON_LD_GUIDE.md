# Руководство по настройке JSON-LD

## Обзор

JSON-LD (JavaScript Object Notation for Linked Data) - это формат структурированных данных, который помогает поисковым системам лучше понимать содержимое вашего сайта.

## Автоматическая генерация

Шаблон автоматически генерирует JSON-LD для всех постов блога, включая следующие поля:

- `@context`: Схема Schema.org
- `@type`: BlogPosting
- `headline`: Заголовок поста
- `description`: Описание поста
- `url`: URL поста
- `datePublished`: Дата публикации
- `dateModified`: Дата последнего обновления (если указана)
- `author`: Автор поста
- `image`: Обложка поста (если указана)
- `keywords`: Теги поста
- `publisher`: Информация об издателе
- `inLanguage`: Язык поста
- `isPartOf`: Связь с основным сайтом и альтернативными языковыми версиями

## Настройка поля Publisher

Поле `publisher` содержит информацию об организации, которая публикует контент. Для его настройки добавьте в конфигурацию локали:

### В файле `src/configs/siteLocalesBase/en.js`:

```javascript
export default {
  label: 'English',
  publisher: {
    name: 'Your Site Name',
    url: 'https://yoursite.com',
    logo: 'https://yoursite.com/logo.png',
  },
  // ... остальная конфигурация
}
```

### В файле `src/configs/siteLocalesBase/ru.js`:

```javascript
export default {
  label: 'Русский',
  publisher: {
    name: 'Название вашего сайта',
    url: 'https://yoursite.com',
    logo: 'https://yoursite.com/logo.png',
  },
  // ... остальная конфигурация
}
```

### Параметры publisher:

- `name`: Название организации/сайта
- `url`: URL основного сайта
- `logo`: URL логотипа организации (опционально)

## Переопределение в конфигурации сайта

Вы также можете переопределить настройки publisher в конфигурации конкретного сайта, добавив в YAML файл:

```yaml
publisher:
  name: 'Custom Site Name'
  url: 'https://customsite.com'
  logo: 'https://customsite.com/custom-logo.png'
```

## Проверка результата

После настройки поле `publisher` должно появиться в JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Заголовок поста",
  "publisher": {
    "@type": "Organization",
    "name": "Your Site Name",
    "url": "https://yoursite.com",
    "logo": { "@type": "ImageObject", "url": "https://yoursite.com/logo.png" }
  }
  // ... остальные поля
}
```

## Устранение проблем

### Поле publisher не появляется:

1. Проверьте, что конфигурация `publisher` добавлена в файлы локалей
2. Убедитесь, что значения не пустые
3. Проверьте консоль на наличие ошибок

### Неправильные данные:

1. Проверьте корректность URL
2. Убедитесь, что логотип доступен по указанному URL
3. Проверьте формат дат в постах

## Дополнительные возможности

Шаблон также поддерживает:

- Автоматическое определение языка
- Генерацию альтернативных языковых версий
- Интеграцию с Open Graph тегами
- Генерацию RSS/Atom фидов
- Канонические ссылки
- Hreflang теги
