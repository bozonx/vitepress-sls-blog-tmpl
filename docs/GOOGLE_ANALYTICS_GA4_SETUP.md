# Настройка Google Analytics 4 для популярных постов

## Обзор

Код в `loadPopularPosts.js` был исправлен для корректной работы с Google Analytics 4 (GA4) Data API. Основные изменения:

1. **Правильная аутентификация** через Service Account JSON
2. **Корректные метрики и измерения** для GA4
3. **Улучшенная обработка ошибок**

## Настройка

### 1. Создание Service Account

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Выберите ваш проект или создайте новый
3. Включите Google Analytics Data API
4. Перейдите в "IAM & Admin" → "Service Accounts"
5. Создайте новый Service Account
6. Скачайте JSON ключ

### 2. Настройка доступа в GA4

1. В Google Analytics перейдите в "Admin" → "Property access management"
2. Добавьте email Service Account с ролью "Viewer"

### 3. Конфигурация в коде

```javascript
// В вашем конфиге VitePress
export default {
  themeConfig: {
    googleAnalytics: {
      propertyId: '123456789', // Ваш GA4 Property ID
      credentialsPath: './path/to/service-account.json', // Путь к JSON файлу
      dataPeriodDays: 30, // Период для получения данных
    },
    popularPosts: {
      enabled: true,
      sortBy: 'pageviews', // 'pageviews', 'uniquePageviews', 'avgTimeOnPage', 'bounceRate'
    },
  },
}
```

## Используемые метрики GA4

- `screenPageViews` - Просмотры страниц
- `totalUsers` - Общее количество пользователей
- `averageSessionDuration` - Средняя продолжительность сессии
- `bounceRate` - Показатель отказов

## Используемые измерения

- `pagePath` - Путь страницы

## Безопасность

⚠️ **Важно**: Никогда не коммитьте JSON файл с учетными данными в репозиторий!

Рекомендуется:

- Добавить `*.json` в `.gitignore`
- Использовать переменные окружения для путей к файлам
- Хранить учетные данные в безопасном месте

## Обработка ошибок

Код включает обработку следующих ошибок:

- Отсутствие файла с учетными данными
- Неверные права доступа (403)
- Неверный запрос к API (400)
- Отсутствие данных в ответе

## Пример использования

```javascript
import { mergeWithAnalytics } from './loadPopularPosts.js'

// В вашем build процессе
const postsWithAnalytics = await mergeWithAnalytics(localeIndex, posts, config)
```

## Отладка

Для отладки проверьте:

1. Правильность Property ID
2. Наличие файла с учетными данными
3. Права доступа Service Account в GA4
4. Включен ли Google Analytics Data API в Google Cloud Console
