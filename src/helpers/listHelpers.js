export function makeTagsList(allData = []) {
  const tags = {};

  for (const item of allData) {
    if (!item.tags?.length) continue;

    for (const tagItem of item.tags) {
      if (typeof tags[tagItem.name] === "undefined") {
        tags[tagItem.name] = { ...tagItem, count: 1 };
      } else {
        tags[tagItem.name].count++;
      }
    }
  }

  const res = Object.keys(tags).map((name) => tags[name]);

  res.sort((a, b) => b.count - a.count);

  return res;
}

export function makeYearsList(allData = []) {
  const years = {};

  for (const item of allData) {
    const postYear = new Date(item.date).getUTCFullYear();

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
    const postYear = new Date(item.date).getUTCFullYear();

    if (postYear !== curYear) continue;

    const postMonth = new Date(item.date).getUTCMonth() + 1;

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

  return allData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((item) => {
      const postYear = new Date(item.date).getUTCFullYear();

      if (postYear !== curYear) return;

      const postMonth = new Date(item.date).getUTCMonth() + 1;

      if (postMonth !== curMonth) return;

      return true;
    });
}

export function makeAuthorsList(allPosts = [], allAuthors = []) {
  const authorPosts = {};

  for (const item of allAuthors) {
    authorPosts[item.id] = 0;
  }

  for (const item of allPosts) {
    if (typeof authorPosts[item.authorId] === "number") {
      authorPosts[item.authorId]++;
    }
  }

  const res = Object.keys(authorPosts).map((id) => ({
    id,
    name: allAuthors.find((item) => item.id === id)?.name,
    count: authorPosts[id],
  }));

  // sort by name
  res.sort((a, b) => b.name - a.name);

  return res;
}
