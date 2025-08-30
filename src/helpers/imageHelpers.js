import { imageSize } from 'image-size'

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
