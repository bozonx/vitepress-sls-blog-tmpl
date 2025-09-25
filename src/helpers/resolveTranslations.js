import locales from '../configs/blogLocalesBase/index.js'

export function resolveTranslationsByFilePath(filePath) {
  if (!filePath) return locales.en

  const segments = filePath?.split('/').filter(Boolean)
  const localeIndex = segments[0]

  if (!locales[localeIndex]) return locales.en

  return locales[localeIndex]
}
