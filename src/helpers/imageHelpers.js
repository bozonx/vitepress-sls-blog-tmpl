import { imageSize } from 'image-size'
import fs from 'fs'

/**
 * Получает размеры изображения из файла
 *
 * @param {string} imagePath - Путь к изображению
 * @param {string} srcDir - Директория исходников
 * @returns {{ width: number; height: number } | null} Размеры изображения или
 *   null
 */
export function getImageDimensions(imagePath, srcDir) {
  if (!imagePath) return null

  try {
    // Полный путь к файлу изображения
    const fullImagePath = path.join(srcDir, 'public', imagePath)

    // Проверяем существование файла
    if (!fs.existsSync(fullImagePath)) {
      console.warn(`Image file not found: ${fullImagePath}`)
      return null
    }

    // Читаем файл в буфер и передаем буфер в getImageSize
    const buffer = fs.readFileSync(fullImagePath)

    // Проверяем, что буфер не пустой
    if (!buffer || buffer.length === 0) {
      console.warn(`Empty buffer for image file: ${fullImagePath}`)
      return null
    }

    const dimensions = getImageSize(buffer)

    // Проверяем, что размеры валидны
    if (!dimensions || !dimensions.width || !dimensions.height) {
      console.warn(`Invalid image dimensions for ${imagePath}`)
      return null
    }

    return { width: dimensions.width, height: dimensions.height }
  } catch (error) {
    console.warn(
      `Failed to get image dimensions for ${imagePath}:`,
      error.message
    )
    return null
  }
}

/**
 * Получает размеры изображения из буфера
 *
 * @param {Buffer} buffer - Буфер с данными изображения
 * @returns {{ width: number; height: number; type: string }} Объект с размерами
 *   и типом изображения
 * @throws {Error} Если не удалось определить размеры изображения
 */
export function getImageSize(buffer) {
  try {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Input must be a Buffer')
    }

    const dimensions = imageSize(buffer)

    return {
      width: dimensions.width,
      height: dimensions.height,
      type: dimensions.type,
    }
  } catch (error) {
    throw new Error(`Failed to get image dimensions: ${error.message}`)
  }
}

/**
 * Проверяет, поддерживается ли формат изображения
 *
 * @param {string} type - Тип изображения (например, 'jpeg', 'png', 'gif')
 * @returns {boolean} True если формат поддерживается
 */
export function isSupportedImageType(type) {
  const supportedTypes = [
    'jpeg',
    'jpg',
    'png',
    'gif',
    'webp',
    'bmp',
    'tiff',
    'ico',
    'svg',
    'avif',
  ]
  return supportedTypes.includes(type.toLowerCase())
}

/**
 * Получает информацию о соотношении сторон изображения
 *
 * @param {number} width - Ширина изображения
 * @param {number} height - Высота изображения
 * @returns {Object} Объект с соотношением сторон и ориентацией
 */
export function getAspectRatioInfo(width, height) {
  const ratio = width / height

  return {
    ratio: ratio,
    ratioFormatted: ratio.toFixed(2),
    orientation: ratio > 1 ? 'landscape' : ratio < 1 ? 'portrait' : 'square',
    isLandscape: ratio > 1,
    isPortrait: ratio < 1,
    isSquare: ratio === 1,
  }
}
