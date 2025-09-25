import { baseLocales } from './blogConfigHelper.js'

export function resolveTranslationsByFilePath(filePath) {
  if (!filePath) return baseLocales.en

  const segments = filePath?.split('/').filter(Boolean)
  const localeIndex = segments[0]

  if (!baseLocales[localeIndex]) return baseLocales.en

  return baseLocales[localeIndex]
}
