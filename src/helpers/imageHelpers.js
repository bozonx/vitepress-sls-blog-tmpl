import { imageSize } from 'image-size'
import fs from 'fs'
import path from 'path'

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
  else if (imagePath.match(/\/\//)) return null

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
