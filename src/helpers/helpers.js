//import moment from 'moment/min/moment-with-locales.js'
// return moment(rawDate, "YYYY-MM-DD").locale(lang).format('LL')

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

/**
 * Resolve article preview text inside article. Or return undefine
 */
export function resolveArticlePreview(frontmatter) {
  const { previewText, description } = frontmatter;

  if (
    frontmatter.embeddedVideo ||
    frontmatter.embeddedAudio ||
    frontmatter.cover ||
    frontmatter.media?.length
  ) {
    return;
  } else if (previewText === true || String(previewText)?.trim() === "true") {
    return description;
  } else if (previewText) {
    return previewText;
  }
}

/**
 * Resolve language. Compare lang from navigator.language with our languiges
 * * en means en-US
 * * es means Latin America Spanish - es-419
 * All other languige we try to compare as is. If can't find use short form - 'ru'.
 * If can't resolve then return 'en'.
 * */
export function resolveNavigatorLang(supportedLocales = [], navLang = "") {
  const navLangLow = navLang.trim().toLowerCase();
  const locales = supportedLocales.map((item) =>
    String(item).trim().toLowerCase(),
  );

  if (navLangLow === "en-us") {
    // en is a default lang for English, it is an en-US
    return "en";
  } else if (navLangLow === "es-419") {
    // default "es" means Latin America Spanish
    return "es";
  }

  if (navLangLow.indexOf("-") > 1) {
    const foundExact = locales.find((item) => item === navLangLow);

    if (foundExact) return navLangLow;
  }

  // if not found or it is short form 2 letters
  const navLangSlice = navLangLow.slice(0, 2);
  const localesSlice = locales.map((item) => item.slice(0, 2));
  const found = localesSlice.find((item) => item === navLangSlice);

  if (found) return found;

  return "en";
}

// export function extractDateFromPostPath(postPath = '') {
//   const pathSplit = postPath.split('/')
//
//   return pathSplit[pathSplit.length - 2]
// }
