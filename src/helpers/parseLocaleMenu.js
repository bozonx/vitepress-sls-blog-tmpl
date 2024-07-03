import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { DEFAULT_ENCODE } from "../constants.js";
import { isExternalUrl } from "./helpers.js";

export function parseLocaleMenu(localeFilePath, relMenuPath, linkPrePath) {
  const absMenuPath = path.resolve(path.dirname(localeFilePath), relMenuPath);
  const content = fs.readFileSync(absMenuPath, DEFAULT_ENCODE);
  const obj = yaml.load(content);
  const menu = yaml.load(obj.body);

  function menuRecursive(items) {
    for (const item of items) {
      if (
        typeof item.link === "string" &&
        item.link.indexOf("/") !== 0 &&
        !isExternalUrl(item.link)
      ) {
        item.link = linkPrePath + item.link;
      }

      if (item.items) {
        item.items = menuRecursive(item.items);
      }
    }

    return items;
  }

  menuRecursive(menu);

  return menu;
}
