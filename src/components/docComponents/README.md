# FileDownload Component

Компонент для скачивания приложенных файлов в VitePress документации.

## Использование

```vue
<FileDownload
  url="/path/to/file.pdf"
  filename="document.pdf"
  size="2.5 MB"
  type="PDF"
  text="Download Document"
/>
```

## Пропсы

| Проп         | Тип       | По умолчанию | Описание                                          |
| ------------ | --------- | ------------ | ------------------------------------------------- |
| `url`        | `String`  | -            | **Обязательный.** URL файла для скачивания        |
| `filename`   | `String`  | `''`         | Имя файла для скачивания (fallback если нет slot) |
| `type`       | `String`  | `''`         | Тип файла (например, "PDF", "DOCX")               |
| `buttonText` | `String`  | `'Download'` | Текст кнопки                                      |
| `class`      | `String`  | `''`         | CSS классы                                        |
| `disabled`   | `Boolean` | `false`      | Отключить кнопку                                  |

## Slots

| Slot      | Описание                                                                                  |
| --------- | ----------------------------------------------------------------------------------------- |
| `default` | Кастомное отображение имени файла. Если не указан, используется `filename` или имя из URL |

## Примеры

### Базовое использование

```vue
<FileDownload url="/files/manual.pdf" />
```

### С дополнительной информацией

```vue
<FileDownload
  url="/files/presentation.pptx"
  filename="Company Presentation 2024.pptx"
  type="PowerPoint"
  buttonText="Download Presentation"
/>
```

### Отключенная кнопка

```vue
<FileDownload
  url="/files/coming-soon.pdf"
  filename="Coming Soon.pdf"
  disabled
  buttonText="Coming Soon"
/>
```

### С кастомным отображением имени файла

```vue
<FileDownload
  url="/files/technical-manual-v2.1.pdf"
  type="PDF"
  buttonText="Download Manual"
>
  <strong>Technical Manual v2.1</strong>
  <br>
  <small>Complete installation guide</small>
</FileDownload>
```

### С HTML разметкой в имени файла

```vue
<FileDownload url="/files/data-export.xlsx" type="Excel">
  📊 <em>Data Export</em> - <span style="color: green;">Latest</span>
</FileDownload>
```

## Особенности

- Автоматическое определение иконки по расширению файла
- Фиксированная иконка скачивания (mdi:download)
- Анимированный спиннер перед текстом во время загрузки
- Кастомное отображение имени файла через slot с поддержкой HTML
- Адаптивный дизайн для мобильных устройств
- Поддержка темной темы
- Обработка ошибок скачивания
- Fallback на открытие в новой вкладке при ошибке
- Поддержка интернационализации через theme.t.downloadFile и theme.t.downloading

## Поддерживаемые типы файлов

Компонент автоматически определяет иконку для следующих типов файлов:

- PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
- TXT, ZIP, RAR, 7Z
- JPG, JPEG, PNG, GIF, SVG
- MP4, AVI, MOV, MP3, WAV
- JSON, JS, TS, HTML, CSS, XML
