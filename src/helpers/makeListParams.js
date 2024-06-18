import path from "path";
import grayMatter from "gray-matter";
import fs from "fs";
import { transliterate } from "./transliterate.js";
import { DEFAULT_ENCODE } from "../constants.js";

export function makeRecentParams(postsDirAbs, perPage) {
  const dates = loadDatesList(postsDirAbs);
  const res = [];

  for (let i = 0; i < dates.length; i += perPage) {
    const page = i === 0 ? i + 1 : i - perPage + 2;

    res.push({ params: { page } });
  }

  return res;
}

export function makeYearsParams(postsDirAbs) {
  const years = loadYears(postsDirAbs);

  return years.map((year) => ({ params: { year } }));
}

export function makeMonthsParams(postsDirAbs) {
  const monthCount = {};
  const dates = loadDatesList(postsDirAbs);

  for (const date of dates) {
    const year = new Date(date).getUTCFullYear();
    const month = new Date(date).getUTCMonth() + 1;
    const yearMonth = `${year}-${month}`;

    if (typeof monthCount[yearMonth] === "undefined") {
      monthCount[yearMonth] = 1;
    } else {
      monthCount[yearMonth]++;
    }
  }

  const res = Object.keys(monthCount).map((item) => {
    const splat = item.split("-");
    const year = Number(splat[0]);
    const month = Number(splat[1]);

    return { params: { year, month } };
  });

  return res;
}

export function makeTagsParams(postsDirAbs, perPage, lang) {
  const tagsCount = {};
  const allFiles = fs
    .readdirSync(postsDirAbs, DEFAULT_ENCODE)
    .filter((item) => item.match(/\.md$/));

  for (const item of allFiles) {
    const itemPath = path.join(postsDirAbs, item);
    const rawContent = fs.readFileSync(itemPath, DEFAULT_ENCODE);
    const { data } = grayMatter(rawContent);
    const tags = data.tags;

    if (!tags?.length) continue;

    for (const tag of tags) {
      if (typeof tagsCount[tag] === "undefined") {
        tagsCount[tag] = 1;
      } else {
        tagsCount[tag]++;
      }
    }
  }

  // const dates = loadDatesList(postsDirAbs);
  //
  // for (const date of dates) {
  //   const datePath = path.join(postsDirAbs, date);
  //   const posts = fs.readdirSync(datePath, DEFAULT_ENCODE);
  //   const filteredPosts = posts.filter((item) => item.endsWith(".md"));
  //
  //   for (const postName of posts) {
  //     const postPath = path.join(datePath, postName);
  //     const postRawContent = fs.readFileSync(postPath, DEFAULT_ENCODE);
  //     const { data } = grayMatter(postRawContent);
  //     const tags = data.tags;
  //
  //     if (!tags?.length) continue;
  //
  //     for (const tag of tags) {
  //       if (typeof tagsCount[tag] === "undefined") {
  //         tagsCount[tag] = 1;
  //       } else {
  //         tagsCount[tag]++;
  //       }
  //     }
  //   }
  // }

  const res = [];

  for (const name of Object.keys(tagsCount)) {
    const slug = transliterate(name, lang);

    for (let i = 0; i < Math.ceil(tagsCount[name] / perPage); i++) {
      res.push({ params: { slug, name, page: i + 1 } });
    }
  }

  return res;
}

export function loadDatesList(postsDirAbs) {
  const allFiles = fs.readdirSync(postsDirAbs, DEFAULT_ENCODE);

  return allFiles
    .filter((item) => item.match(/\.md$/))
    .map((item) => {
      const itemPath = path.join(postsDirAbs, item);
      const rawContent = fs.readFileSync(itemPath, DEFAULT_ENCODE);
      const { data } = grayMatter(rawContent);

      return data.pubDate;
    });

  // return dates.filter((item) => {
  //   if (!item.match(/^\d{4}\-\d{2}\-\d{2}$/)) return
  //
  //   const itemPath = path.join(postsDirAbs, item)
  //   const stat = fs.statSync(itemPath)
  //
  //   return stat.isDirectory()
  // })
}

export function loadYears(postsDirAbs) {
  const dates = loadDatesList(postsDirAbs);

  return dates.reduce((acc, date) => {
    const year = new Date(date).getUTCFullYear();

    if (!acc.includes(year)) {
      acc.push(year);
    }

    return acc;
  }, []);
}
