import path from 'path'
import { ROOT_LANG } from '../constants.js'

/**
 * Добавляет метатеги hreflang в head страницы для SEO и многоязычности
 * Генерирует ссылки на эту же страницу на всех доступных языках
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function addHreflang(pageData, { siteConfig }) {
  // Пропускаем корневые страницы и страницы без языкового префикса
  if (!pageData.filePath || pageData.filePath.indexOf('/') < 0) {
    return
  }

  const hostname = siteConfig.userConfig.hostname
  if (!hostname) return

  // Получаем текущий язык из пути файла
  const currentLang = pageData.filePath.split('/')[0]

  // Получаем доступные языки из конфигурации, исключая root
  const availableLocales = siteConfig.site.locales
  if (!availableLocales) return

  console.log('availableLocales', currentLang, availableLocales)

  // Фильтруем языки, исключая root и текущий язык
  const otherLocales = Object.keys(availableLocales).filter(
    // (lang) => lang !== 'root' && lang !== currentLang
    (lang) => lang !== ROOT_LANG
  )

  // Если нет языков, не добавляем hreflang
  if (otherLocales.length === 0) return

  // Инициализируем head если его нет
  if (!pageData.frontmatter.head) {
    pageData.frontmatter.head = []
  }

  // TODO: review
  // Генерируем путь страницы без языкового префикса
  const pagePathWithoutLang = pageData.filePath.substring(
    currentLang.length + 1
  )

  // Убираем расширение файла
  const fileExtension = path.extname(pagePathWithoutLang)
  const cleanPath = pagePathWithoutLang.substring(
    0,
    pagePathWithoutLang.length - fileExtension.length
  )

  // Убираем индекс из пути
  const finalPath = cleanPath.replace(/\/index$/, '')

  // Добавляем метатег для текущего языка
  const currentLangConfig = availableLocales[currentLang]
  const currentLangCode = currentLangConfig?.lang || currentLang

  pageData.frontmatter.head.push([
    'link',
    {
      rel: 'alternate',
      hreflang: currentLangCode,
      href: `${hostname}/${currentLang}${finalPath ? `/${finalPath}` : ''}`,
    },
  ])

  // Добавляем метатеги для других языков
  otherLocales.forEach((lang) => {
    const langConfig = availableLocales[lang]
    const langCode = langConfig?.lang || lang

    pageData.frontmatter.head.push([
      'link',
      {
        rel: 'alternate',
        hreflang: langCode,
        href: `${hostname}/${lang}${finalPath ? `/${finalPath}` : ''}`,
      },
    ])
  })

  // TODO: правильно взять основной язык
  // Добавляем x-default hreflang (указывает на основной язык сайта)
  // Определяем основной язык как первый доступный (обычно en)
  const mainLang = otherLocales[0] || currentLang
  const mainLangConfig = availableLocales[mainLang]
  const mainLangCode = mainLangConfig?.lang || mainLang

  pageData.frontmatter.head.push([
    'link',
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${hostname}/${mainLang}${finalPath ? `/${finalPath}` : ''}`,
    },
  ])
}
