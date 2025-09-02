import { ROOT_LANG } from '../constants.js'
import { generatePageUrlPath } from '../helpers/helpers.js'

/**
 * Добавляет метатеги hreflang в head страницы для SEO и многоязычности
 * Генерирует ссылки на эту же страницу на всех доступных языках Основной язык
 * (x-default) определяется из siteConfig.userConfig.locales.root.lang
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 */
export function addHreflang(pageData, { siteConfig }) {
  // Пропускаем корневые страницы и страницы без языкового префикса
  if (!pageData.relativePath || pageData.relativePath.indexOf('/') < 0) {
    return
  }

  // Получаем доступные языки из конфигурации, исключая root
  const availableLocales = siteConfig.site.locales
  const hostname = siteConfig.userConfig.hostname

  if (!hostname || !availableLocales) return

  // Фильтруем языки, исключая root
  const localesIndexes = Object.keys(availableLocales).filter(
    (lang) => lang !== ROOT_LANG
  )

  // Если нет языков, не добавляем hreflang
  if (localesIndexes.length === 0) return
  // Инициализируем head если его нет
  if (!pageData.frontmatter.head) pageData.frontmatter.head = []

  // Получаем текущий язык из пути файла
  const [, ...restPath] = pageData.relativePath.split('/')
  const pagePathWithoutLang = restPath.join('/')
  const cleanPath = generatePageUrlPath(pagePathWithoutLang)
  const finalPath = cleanPath ? `/${cleanPath}` : ''

  console.log('finalPath', pagePathWithoutLang, cleanPath, finalPath)

  // Добавляем метатеги для всех языков, включая текущий
  localesIndexes.forEach((lang) => {
    const langCode = availableLocales[lang]?.lang || lang

    pageData.frontmatter.head.push([
      'link',
      {
        rel: 'alternate',
        hreflang: langCode,
        href: `${hostname}/${lang}${finalPath}`,
      },
    ])
  })

  // Добавляем x-default hreflang (указывает на основной язык сайта)
  // Определяем основной язык из конфигурации сайта (siteConfig.userConfig.locales.root.lang)
  // Если не указан, используем 'en-US' как fallback
  const defaultLang = siteConfig.userConfig?.locales?.root?.lang || 'en-US'
  // Находим локаль, соответствующую языку по умолчанию
  const mainLang = localesIndexes.find(
    (lang) => availableLocales[lang]?.lang === defaultLang
  )

  if (!mainLang) {
    console.warn(
      `[addHreflang] Не удалось определить основной язык для страницы: ${pageData.relativePath}`
    )
    return
  }

  pageData.frontmatter.head.push([
    'link',
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${hostname}/${mainLang}${finalPath}`,
    },
  ])
}
