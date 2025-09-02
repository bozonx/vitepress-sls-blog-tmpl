/*

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "О нас",
  "url": "https://example.com/about",
  "description": "Страница о нашей команде и миссии блога, посвященного [тематика блога].",
  "isPartOf": {
    "@type": "WebSite",
    "name": "[Название блога]",
    "url": "https://example.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "[Название компании или блога]",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png",
      "width": 200,
      "height": 60
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@example.com",
      "url": "https://example.com/contact"
    }
  },
  "mainEntity": {
    "@type": "Organization",
    "name": "[Название блога или организации]",
    "description": "Мы — команда энтузиастов, создающих контент о [тематика блога]. Наша миссия — делиться полезной информацией и вдохновлять читателей.",
    "url": "https://example.com",
    "sameAs": [
      "https://twitter.com/example",
      "https://facebook.com/example",
      "https://instagram.com/example"
    ],
    "founder": [
      {
        "@type": "Person",
        "name": "[Имя основателя]",
        "jobTitle": "Основатель",
        "url": "https://example.com/authors/founder"
      }
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://example.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "О нас",
        "item": "https://example.com/about"
      }
    ]
  }
}
</script>
*/

import yaml from 'yaml'

/**
 * Создает JSON-LD структуру на основе YAML данных из frontmatter Поддерживает
 * параметры: @type, name, url, description, isPartOf
 *
 * @param {Object} pageData - Данные страницы
 * @param {Object} ctx - Контекст с siteConfig
 * @returns {Object} Обновленные данные страницы
 */
export function createYamlToJsonLd(pageData, { siteConfig }) {
  // Проверяем наличие YAML данных в frontmatter
  if (!pageData.frontmatter?.jsonLd) {
    return pageData
  }

  try {
    // Парсим YAML в объект
    const yamlData = yaml.parse(pageData.frontmatter.jsonLd)

    // Создаем базовую JSON-LD структуру
    const jsonLd = { '@context': 'https://schema.org' }

    // Добавляем поддерживаемые параметры
    if (yamlData['@type']) {
      jsonLd['@type'] = yamlData['@type']
    }

    if (yamlData.name) {
      jsonLd.name = yamlData.name
    }

    if (yamlData.url) {
      jsonLd.url = yamlData.url
    }

    if (yamlData.description) {
      jsonLd.description = yamlData.description
    }

    // Обрабатываем isPartOf - может быть объектом или массивом
    if (yamlData.isPartOf) {
      if (Array.isArray(yamlData.isPartOf)) {
        jsonLd.isPartOf = yamlData.isPartOf.map((item) => ({
          '@type': item['@type'] || 'WebSite',
          name: item.name,
          url: item.url,
        }))
      } else {
        jsonLd.isPartOf = {
          '@type': yamlData.isPartOf['@type'] || 'WebSite',
          name: yamlData.isPartOf.name,
          url: yamlData.isPartOf.url,
        }
      }
    }

    // Добавляем сгенерированные данные в frontmatter
    pageData.frontmatter.jsonLdData = jsonLd
  } catch (error) {
    console.warn(
      `Ошибка парсинга YAML для JSON-LD на странице ${pageData.relativePath}:`,
      error.message
    )

    // В случае ошибки добавляем пустой объект
    pageData.frontmatter.jsonLdData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
    }
  }

  return pageData
}
