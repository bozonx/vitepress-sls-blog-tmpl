# Конфигурация внешних ссылок

## Проблема

По умолчанию VitePress автоматически добавляет атрибут `rel="noreferrer"` ко всем внешним ссылкам в постах. Это поведение встроено в VitePress и предназначено для повышения безопасности, но может быть нежелательным в некоторых случаях.

## Решение

В конфигурационных файлах `blogConfigBase.js` и `siteConfigBase.js` добавлена опция `externalLinks` в секцию `markdown`:

```javascript
markdown: {
  ...config.markdown,
  image: { lazyLoading: true, ...config.markdown?.image },
  // Отключаем rel="noreferrer" для внешних ссылок
  externalLinks: { target: '_blank', rel: [] },
  config: (md) => {
    md.use(mdImage, { srcDir: config.srcDir })

    if (config.markdown?.config) {
      config.markdown.config(md)
    }
  },
},
```

## Как это работает

- `target: '_blank'` - ссылки по-прежнему открываются в новой вкладке
- `rel: []` - пустой массив отключает добавление атрибутов `rel`, включая `noreferrer`

## Альтернативные варианты

Если вы хотите добавить другие атрибуты `rel`, вы можете изменить массив:

```javascript
// Добавить только noopener (рекомендуется для безопасности)
externalLinks: { target: '_blank', rel: ['noopener'] },

// Добавить noopener и nofollow
externalLinks: { target: '_blank', rel: ['noopener', 'nofollow'] },

// Полностью отключить все атрибуты rel
externalLinks: { target: '_blank', rel: [] },
```

## Безопасность

**Важно**: Атрибут `noreferrer` добавляется для безопасности, чтобы предотвратить:

- Утечку информации о реферере
- Потенциальные атаки через `window.opener`

Если вы отключаете `noreferrer`, рекомендуется добавить `noopener` для базовой защиты:

```javascript
externalLinks: { target: '_blank', rel: ['noopener'] },
```

## Применение изменений

Изменения вступят в силу после перезапуска сервера разработки или пересборки проекта.
