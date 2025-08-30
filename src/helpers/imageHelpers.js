import { imageSize } from 'image-size'

/**
 * Получает размеры изображения из различных источников
 *
 * @param {Buffer | Uint8Array | string} input - Буфер, Uint8Array или путь к
 *   файлу
 * @returns {Promise<{ width: number; height: number; type: string }>} Объект с
 *   размерами и типом изображения
 * @throws {Error} Если не удалось определить размеры изображения
 */
export async function getImageSize(input) {
  try {
    let buffer

    // Если передан путь к файлу (строка), читаем файл
    if (typeof input === 'string') {
      const fs = await import('fs')
      buffer = fs.readFileSync(input)
    }
    // Если передан Uint8Array, конвертируем в Buffer
    else if (input instanceof Uint8Array) {
      buffer = Buffer.from(input)
    }
    // Если передан Buffer
    else if (Buffer.isBuffer(input)) {
      buffer = input
    }
    // Если передан ArrayBuffer
    else if (input instanceof ArrayBuffer) {
      buffer = Buffer.from(input)
    } else {
      throw new Error(
        'Unsupported input type. Expected Buffer, Uint8Array, ArrayBuffer or file path string'
      )
    }

    // Используем синхронную версию для буферов
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
 * Получает размеры изображения из File объекта (для браузера)
 *
 * @param {File} file - File объект из input[type="file"]
 * @returns {Promise<{ width: number; height: number; type: string }>} Объект с
 *   размерами и типом изображения
 */
export async function getImageSizeFromFile(file) {
  if (!(file instanceof File)) {
    throw new Error('Input must be a File object')
  }

  const arrayBuffer = await file.arrayBuffer()
  return getImageSize(arrayBuffer)
}

/**
 * Получает размеры изображения из URL
 *
 * @param {string} url - URL изображения
 * @returns {Promise<{ width: number; height: number; type: string }>} Объект с
 *   размерами и типом изображения
 */
export async function getImageSizeFromUrl(url) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    return getImageSize(arrayBuffer)
  } catch (error) {
    throw new Error(`Failed to fetch image from URL: ${error.message}`)
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
