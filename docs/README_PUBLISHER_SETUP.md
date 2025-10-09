# Настройка поля Publisher для JSON-LD

## Проблема

Поле `publisher` не появляется в JSON-LD, потому что не настроено в конфигурации локалей.

## Решение

### 1. Добавьте конфигурацию в файлы локалей

#### `src/configs/siteLocalesBase/en.js`:

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

#### `src/configs/siteLocalesBase/ru.js`:

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

### 2. Или переопределите в конфигурации сайта

В YAML файле вашего сайта:

```yaml
publisher:
  name: 'Custom Site Name'
  url: 'https://customsite.com'
  logo: 'https://customsite.com/logo.png'
```

## Что происходит в коде

В трансформере `addJsonLd.js` поле `publisher` формируется так:

```javascript
const publisher = langConfig.publisher && {
  '@type': 'Organization',
  name: langConfig.publisher.name || siteName,
  url: langConfig.publisher.url || hostname,
  logo: langConfig.publisher.logo && {
    '@type': 'ImageObject',
    url: langConfig.publisher.logo,
  },
}
```

Если `langConfig.publisher` не определен, переменная `publisher` становится `undefined`, и поле не добавляется в JSON-LD.

## Результат

После настройки в JSON-LD появится:

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

## Проверка

1. Добавьте конфигурацию `publisher`
2. Пересоберите сайт
3. Проверьте JSON-LD на странице поста
4. Убедитесь, что поле `publisher` присутствует

## Дополнительная информация

См. файл `docs/JSON_LD_GUIDE.md` для полного руководства по настройке JSON-LD.
