# Components

## JsonLdDisplay.vue

Компонент для отображения сгенерированных JSON-LD данных на странице.

### Использование

```vue
<template>
  <JsonLdDisplay :jsonLdData="$frontmatter.jsonLdData" />
</template>

<script setup>
import JsonLdDisplay from '../components/JsonLdDisplay.vue'
</script>
```

### Props

- `jsonLdData` (Object) - JSON-LD данные для отображения

### Функциональность

- Отображает JSON-LD данные в свертываемом блоке
- Кнопка копирования данных в буфер обмена
- Ссылка для тестирования с Google Rich Results Test
- Поддержка темной темы
- Адаптивный дизайн

### Особенности

- Данные отображаются в формате JSON с подсветкой
- Автоматическое определение URL для тестирования Google
- Обработка ошибок копирования
- Временные уведомления о статусе операций
