# Интеграция Google Analytics для популярных постов

Этот документ описывает, как настроить отображение самых популярных постов на основе статистики Google Analytics.

## 🚀 Возможности

- **Автоматическая сортировка** постов по статистике GA
- **Множественные критерии** сортировки (просмотры, уникальные просмотры, время на странице, процент отказов)
- **Кэширование** статистики для повышения производительности
- **Fallback** на сортировку по дате при недоступности GA
- **Визуальные индикаторы** использования GA статистики

## ⚙️ Настройка

### 1. Настройка Google Analytics API

#### Создание сервисного аккаунта

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Google Analytics Reporting API
4. Создайте сервисный аккаунт:
   - Перейдите в "IAM & Admin" → "Service Accounts"
   - Нажмите "Create Service Account"
   - Заполните данные и создайте ключ JSON

#### Настройка доступа в Google Analytics

1. В Google Analytics перейдите в "Admin" → "Property Access Management"
2. Добавьте email сервисного аккаунта с правами "Viewer"

### 2. Конфигурация в блоге

Добавьте настройки GA в конфигурацию блога:

```javascript
// .vitepress/config.js
export default {
  themeConfig: {
    // ... другие настройки

    googleAnalytics: {
      // Включить использование GA для популярных постов
      enabled: true,

      // ID свойства Google Analytics 4 (например: 123456789)
      propertyId: 'YOUR_GA4_PROPERTY_ID',

      // Путь к файлу с учетными данными (JSON ключ)
      credentialsPath: './credentials/ga-service-account.json',

      // Поле для сортировки популярных постов
      sortBy: 'pageviews', // 'pageviews' | 'uniquePageviews' | 'avgTimeOnPage' | 'bounceRate'

      // Кэшировать статистику (в часах)
      cacheHours: 24,

      // Путь к файлу кэша статистики
      cacheFilePath: './.cache/ga-stats.json',
    },
  },
}
```

### 3. Структура файлов

```
your-blog/
├── .vitepress/
│   └── config.js
├── credentials/
│   └── ga-service-account.json  # JSON ключ от Google
├── .cache/
│   └── ga-stats.json           # Кэш статистики (создается автоматически)
└── src/
    └── ...
```

## 📊 Критерии сортировки

### `pageviews`

- **Описание**: Общее количество просмотров страницы
- **Использование**: Показывает самые посещаемые посты
- **Отображение**: "👁️ 1,234 views"

### `uniquePageviews`

- **Описание**: Количество уникальных просмотров
- **Использование**: Показывает посты с наибольшим охватом
- **Отображение**: "👤 987 unique views"

### `avgTimeOnPage`

- **Описание**: Среднее время, проведенное на странице
- **Использование**: Показывает самые интересные посты
- **Отображение**: "⏱️ 5m 23s avg"

### `bounceRate`

- **Описание**: Процент пользователей, покинувших сайт после просмотра одной страницы
- **Использование**: Показывает посты с низким процентом отказов (меньше = лучше)
- **Отображение**: "📈 23.4% bounce rate"

## 📚 Используемые библиотеки

Система использует официальную библиотеку Google для работы с API:

### `googleapis` - Официальная библиотека Google APIs

```bash
npm install googleapis
```

**Преимущества:**

- ✅ Официальная поддержка от Google
- ✅ Автоматическая аутентификация
- ✅ Поддержка GA4 и Universal Analytics
- ✅ TypeScript типы
- ✅ Активное развитие и обновления

**Версия:** `^144.0.0` (последняя стабильная)

## 🔧 Реализация реального API

Система автоматически поддерживает как GA4, так и Universal Analytics:

### 1. Установите зависимости

```bash
npm install googleapis
```

### 2. Настройте конфигурацию

Система автоматически поддерживает обе версии Google Analytics:

```javascript
// .vitepress/config.js
export default defineConfig(
  mergeBlogConfig({
    themeConfig: {
      googleAnalytics: {
        enabled: true,
        version: 'ga4', // 'ga4' или 'ua' (Universal Analytics)
        propertyId: 'YOUR_PROPERTY_ID',
        credentialsPath: './credentials/ga-service-account.json',
        sortBy: 'pageviews',
        dataPeriodDays: 30, // Период данных в днях
        useMockData: false, // true для разработки
      },
    },
  })
)
```

### 3. Автоматическая поддержка GA4 и Universal Analytics

Система автоматически выбирает правильный API:

```javascript
import { google } from 'googleapis'

async function fetchRealGAStats(config) {
  const { gaConfig } = config

  // Загружаем учетные данные
  const credentials = JSON.parse(
    await fs.readFile(gaConfig.credentialsPath, 'utf-8')
  )

  // Создаем клиент для GA Reporting API
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })

  const analyticsreporting = google.analyticsreporting({ version: 'v4', auth })

  // Запрашиваем данные за последние 30 дней
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 30)

  const response = await analyticsreporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: gaConfig.propertyId,
          dateRanges: [
            {
              startDate: startDate.toISOString().split('T')[0],
              endDate: endDate.toISOString().split('T')[0],
            },
          ],
          metrics: [
            { expression: 'ga:pageviews' },
            { expression: 'ga:uniquePageviews' },
            { expression: 'ga:avgTimeOnPage' },
            { expression: 'ga:bounceRate' },
          ],
          dimensions: [{ name: 'ga:pagePath' }],
          orderBys: [{ fieldName: 'ga:pageviews', sortOrder: 'DESCENDING' }],
        },
      ],
    },
  })

  // Обрабатываем ответ и возвращаем статистику
  return processGAResponse(response.data)
}
```

## 🎯 Использование

После настройки компонент `PopularPostsList` автоматически:

1. **Загружает статистику** из Google Analytics при монтировании
2. **Сортирует посты** по выбранному критерию
3. **Кэширует данные** для повышения производительности
4. **Показывает индикаторы** загрузки и использования GA
5. **Отображает метрики** для каждого поста
6. **Использует fallback** при ошибках

## 🚨 Обработка ошибок

Система автоматически обрабатывает следующие ситуации:

- **GA отключен**: Используется сортировка по дате
- **Ошибка API**: Показывается сообщение об ошибке, используется fallback
- **Нет данных**: Используется сортировка по дате
- **Устаревший кэш**: Автоматически обновляется

## 🔒 Безопасность

- **Храните JSON ключи** в безопасном месте
- **Не коммитьте** файлы с учетными данными в Git
- **Используйте переменные окружения** для продакшена
- **Ограничьте права** сервисного аккаунта

## 📝 Примеры конфигурации

### Для разработки (с моковыми данными)

```javascript
googleAnalytics: {
  enabled: true,
  version: 'ga4',
  propertyId: null,
  credentialsPath: null,
  sortBy: 'pageviews',
  cacheHours: 1,
  cacheFilePath: './.cache/ga-stats-dev.json',
  dataPeriodDays: 7,
  useMockData: true, // Используем моковые данные
}
```

### Для продакшена (GA4)

```javascript
googleAnalytics: {
  enabled: true,
  version: 'ga4',
  propertyId: process.env.GA4_PROPERTY_ID,
  credentialsPath: process.env.GA_CREDENTIALS_PATH,
  sortBy: 'uniquePageviews',
  cacheHours: 24,
  cacheFilePath: './.cache/ga-stats.json',
  dataPeriodDays: 30,
  useMockData: false,
}
```

### Для продакшена (Universal Analytics)

```javascript
googleAnalytics: {
  enabled: true,
  version: 'ua',
  propertyId: process.env.GA_VIEW_ID,
  credentialsPath: process.env.GA_CREDENTIALS_PATH,
  sortBy: 'pageviews',
  cacheHours: 24,
  cacheFilePath: './.cache/ga-stats.json',
  dataPeriodDays: 30,
  useMockData: false,
}
```

## 🎨 Кастомизация

Вы можете настроить отображение статистики, изменив шаблон в `PopularPostsList.vue`:

```vue
<!-- Показываем дополнительную информацию -->
<div v-if="item.gaStats" class="ml-4 mt-1 text-xs text-gray-500">
  <div class="flex gap-4">
    <span>👁️ {{ item.gaStats.pageviews.toLocaleString() }}</span>
    <span>👤 {{ item.gaStats.uniquePageviews.toLocaleString() }}</span>
    <span>⏱️ {{ Math.floor(item.gaStats.avgTimeOnPage / 60) }}m</span>
  </div>
</div>
```
