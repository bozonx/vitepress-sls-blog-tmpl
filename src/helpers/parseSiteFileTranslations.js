import fs from 'node:fs'
import path from 'node:path'
import yaml from 'yaml'
import { standardTemplate } from 'squidlet-lib'

import { DEFAULT_ENCODE } from '../constants.js'

export const SITE_DIR_REL_PATH = '../site'

export function parseLocaleSite(configFilePath, props) {
  const translations = loadConfigYamlFile(
    configFilePath,
    `site.${props.lang}.yaml`
  )

  function transRecursive(items) {
    if (Array.isArray(items)) {
      for (const index in items) {
        items[index] = transRecursive(items[index])
      }

      return items
    } else if (typeof items === 'object') {
      for (const index of Object.keys(items)) {
        items[index] = transRecursive(items[index])
      }

      return items
    } else if (typeof items === 'string') {
      return standardTemplate(items, props)
    }

    return items
  }

  return transRecursive(translations)
}

export function loadConfigYamlFile(configFilePath, fileName) {
  const relPath = path.join(SITE_DIR_REL_PATH, fileName)
  const absPath = path.resolve(path.dirname(configFilePath), relPath)
  const content = fs.readFileSync(absPath, DEFAULT_ENCODE)
  const obj = yaml.parse(content)

  return yaml.parse(obj.body)
}
