import grayMatter from "gray-matter";

//import moment from 'moment/min/moment-with-locales.js'
// return moment(rawDate, "YYYY-MM-DD").locale(lang).format('LL')

export function parseMdFile(rawContent) {
  const { data, content } = grayMatter(rawContent);

  return {
    frontmatter: data,
    content,
  };
}

/**
 * Is it post or util page
 */
export function isPost(frontmatter) {
  return Boolean(frontmatter.pubDate);
}

export function makeHumanDate(rawDate, lang) {
  if (!rawDate) return;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  return new Date(rawDate).toLocaleDateString(lang, options);
}

export function resolveI18Href(rawHref, localeIndex, i18nRouting) {
  if (!rawHref) return rawHref;

  const isExternal = isExternalUrl(rawHref);

  if (isExternal || !i18nRouting) return rawHref;

  return `/${localeIndex}${rawHref}`;
}

export function isExternalUrl(url) {
  return Boolean(url && url.match(/^[\a-z\d]+\:\/\//));
  //return url && !url.startsWith('/')
}

// export function extractDateFromPostPath(postPath = '') {
//   const pathSplit = postPath.split('/')
//
//   return pathSplit[pathSplit.length - 2]
// }
