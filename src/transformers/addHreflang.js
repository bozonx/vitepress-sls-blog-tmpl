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
  const [currentLang, ...restPath] = pageData.filePath.split('/')
  // Получаем доступные языки из конфигурации, исключая root
  const availableLocales = siteConfig.site.locales

  if (!availableLocales) return

  // Фильтруем языки, исключая root
  const localesIndexes = Object.keys(availableLocales).filter(
    (lang) => lang !== ROOT_LANG
  )

  // Если нет языков, не добавляем hreflang
  if (localesIndexes.length === 0) return
  // Инициализируем head если его нет
  if (!pageData.frontmatter.head) pageData.frontmatter.head = []

  // TODO: путь не резовлится в реальный url
  const pagePathWithoutLang = restPath.join('/')
  // Убираем расширение файла
  const fileExtension = path.extname(pagePathWithoutLang)
  const cleanPath = pagePathWithoutLang.substring(
    0,
    pagePathWithoutLang.length - fileExtension.length
  )

  // Убираем индекс из пути
  const finalPath = cleanPath.replace(/\/index$/, '')

  // Добавляем метатеги для всех языков, включая текущий
  localesIndexes.forEach((lang) => {
    const langCode = availableLocales[lang]?.lang || lang

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
  const mainLang = localesIndexes[0] || currentLang
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
