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

export function createYamlToJsonLd(pageData, { siteConfig }) {
  return pageData
}
