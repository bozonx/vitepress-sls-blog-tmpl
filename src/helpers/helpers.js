//import moment from 'moment/min/moment-with-locales.js'
// return moment(rawDate, "YYYY-MM-DD").locale(lang).format('LL')

/**
 * Is it post or util page
 */
export function isPost(frontmatter) {
  return Boolean(frontmatter.date);
}

export function isHomePage(frontmatter) {
  return frontmatter.layout === "home";
}

export function isPage(frontmatter) {
  return typeof frontmatter.layout === "undefined" && !frontmatter.date;
}

// /**
//  * Returns [640, 320] from "some-file-name--640x320.avif"
//  * or undefined is it doesn't contain dimestions
//  */
// export function extractImgDimensionFromFileName(fileName) {
//   const res = String(fileName).match(/\-\-(\d{3,})x(\d{3,})\.[\w\d]+$/);
//
//   if (res) return [Number(res[1]), Number(res[2])];
// }

export function removeRootItemFromSiteMap(items) {
  const edited = items
    // remove root item
    .filter((item) => item.url)
    .map((item) => {
      if (item.url.indexOf("/") === item.url.length - 1) {
        return {
          ...item,
          // remove empty url which is means the root
          links: item.links.filter((item) => item.url),
        };
      } else return item;
    });

  return edited;
}

export function makeHumanDate(rawDate, lang, toTimeZone = "UTC") {
  if (!rawDate) return;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: toTimeZone,
  };

  return new Date(rawDate).toLocaleDateString(lang, options);
}

export function resolveI18Href(rawHref, localeIndex, i18nRouting) {
  const trimmed = String(rawHref).trim();

  if (typeof rawHref !== "string" || !trimmed) return rawHref;
  // main page
  else if (trimmed === "/") return "/" + localeIndex;

  const isExternal = isExternalUrl(trimmed);

  if (isExternal || !i18nRouting) return trimmed;
  // already included language
  if (trimmed.indexOf("/") === 0) return trimmed;
  // add language
  return `/${localeIndex}/${trimmed}`;
}

export function isExternalUrl(url) {
  return Boolean(url && url.match(/^[\a-z\d]+\:\/\//));
  //return url && !url.startsWith('/')
}

/**
 * Resolve article preview text inside article. Or return undefine
 */
export function resolveArticlePreview(frontmatter) {
  const { previewText, descrAsPreview, description } = frontmatter;

  if (previewText) {
    return previewText;
  } else if (descrAsPreview && description) {
    return description;
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
  const navLangLow = String(navLang).trim().toLowerCase();
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
    // means lang code and country like en-us
    const foundExact = locales.find((item) => item === navLangLow);

    if (foundExact) return navLangLow;
  }

  // if not found or it is short form 2 letters
  const navLangSlice = navLangLow.slice(0, 2);
  const localesSlice = locales.map((item) => item.slice(0, 2));
  const found = localesSlice.find((item) => item === navLangSlice);

  if (found) return found;
  // return default language
  return "en";
}

export function arraysIntersection(arr1 = [], arr2 = []) {
  return arr1.filter((x) => arr2.includes(x));
}

// export function extractDateFromPostPath(postPath = '') {
//   const pathSplit = postPath.split('/')
//
//   return pathSplit[pathSplit.length - 2]
// }
