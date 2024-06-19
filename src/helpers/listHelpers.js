export function makeTagsList(allData = []) {
  const tags = {};

  for (const item of allData) {
    if (!item.tags?.length) continue;

    for (const tag of item.tags) {
      if (typeof tags[tag] === "undefined") {
        tags[tag] = 1;
      } else {
        tags[tag]++;
      }
    }
  }

  const res = Object.keys(tags).map((tag) => ({ name: tag, count: tags[tag] }));
  // sort by count
  res.sort((a, b) => b.count - a.count);

  return res;
}

export function makeYearsList(allData = []) {
  const years = {};

  for (const item of allData) {
    const postYear = new Date(item.pubDate).getUTCFullYear();

    if (typeof years[postYear] === "undefined") {
      years[postYear] = 1;
    } else {
      years[postYear]++;
    }
  }

  const res = Object.keys(years).map((year) => ({
    year: Number(year),
    count: years[year],
  }));
  // sort by year
  res.sort((a, b) => b.year - a.year);

  return res;
}

export function makeMonthsList(allData = [], year) {
  const curYear = Number(year);
  const months = {};

  for (const item of allData) {
    const postYear = new Date(item.pubDate).getUTCFullYear();

    if (postYear !== curYear) continue;

    const postMonth = new Date(item.pubDate).getUTCMonth() + 1;

    if (typeof months[postMonth] === "undefined") {
      months[postMonth] = 1;
    } else {
      months[postMonth]++;
    }
  }

  const res = Object.keys(months).map((month) => ({
    month: Number(month),
    count: months[month],
  }));

  res.sort((a, b) => b.month + a.month);

  return res;
}

export function makePostOfMonthList(allData = [], year, month) {
  const curYear = Number(year);
  const curMonth = Number(month);

  return allData.filter((item) => {
    const postYear = new Date(item.pubDate).getUTCFullYear();

    if (postYear !== curYear) return;

    const postMonth = new Date(item.pubDate).getUTCMonth() + 1;

    if (postMonth !== curMonth) return;

    return true;
  });
}
