# Настройка Google Analytics для популярных постов

## Обзор

Система автоматически определяет самые популярные посты на основе данных Google Analytics 4 (GA4) и отображает их на главной странице блога.

## Настройка

### 1. Создание Service Account в Google Cloud Console

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Выберите ваш проект или создайте новый
3. Включите Google Analytics Reporting API
4. Перейдите в "IAM & Admin" → "Service Accounts"
5. Создайте новый Service Account:
   - Название: `vitepress-blog-analytics`
   - Описание: `Service account for VitePress blog analytics`
6. Создайте ключ (JSON) и скачайте файл

### 2. Настройка доступа в Google Analytics

1. Перейдите в [Google Analytics](https://analytics.google.com/)
2. Выберите ваш GA4 property
3. Перейдите в "Admin" → "Property access management"
4. Добавьте email вашего Service Account с правами "Viewer"

### 3. Получение Property ID

1. В Google Analytics перейдите в "Admin" → "Property Settings"
2. Скопируйте "Property ID" (формат: `123456789`)

### 4. Конфигурация в VitePress

Добавьте в ваш конфиг VitePress:

```javascript
// .vitepress/config.js
export default {
  themeConfig: {
    // Включение популярных постов
    popularPosts: {
      enabled: true,
      sortBy: 'pageviews', // 'pageviews', 'uniquePageviews', 'avgTimeOnPage', 'bounceRate'
      outputPath: 'popular-posts.json',
    },

    // Настройки Google Analytics
    googleAnalytics: {
      version: 'ga4',
      propertyId: 'YOUR_PROPERTY_ID', // Замените на ваш Property ID
      credentialsPath: './path/to/your/service-account-key.json', // Путь к JSON файлу
      dataPeriodDays: 30, // Период для анализа данных (дни)
    },
  },
}
```

## Доступные метрики

- **pageviews** - Общее количество просмотров страницы
- **uniquePageviews** - Уникальные просмотры страницы
- **avgTimeOnPage** - Среднее время на странице
- **bounceRate** - Показатель отказов (чем меньше, тем лучше)

## Сортировка

По умолчанию посты сортируются по количеству просмотров (`pageviews`). Вы можете изменить это в настройке `sortBy`:

```javascript
popularPosts: {
  enabled: true,
  sortBy: 'uniquePageviews' // Сортировка по уникальным просмотрам
}
```

## Безопасность

⚠️ **Важно**: Никогда не коммитьте файл с учетными данными в репозиторий!

Добавьте путь к файлу с учетными данными в `.gitignore`:

```gitignore
# Google Analytics credentials
path/to/your/service-account-key.json
```

## Отладка

При возникновении проблем проверьте:

1. Правильность Property ID
2. Существование файла с учетными данными
3. Права доступа Service Account в Google Analytics
4. Включен ли Google Analytics Reporting API в Google Cloud Console

Логи сборки покажут подробную информацию о процессе загрузки данных.
