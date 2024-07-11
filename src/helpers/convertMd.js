// import { remark } from "remark";
// import strip from "strip-markdown";
// import remarkHtml from "remark-html";

export function stripMd(mdContent) {
  return mdContent;
  // return remark().use(strip).processSync(mdContent).toString();
}

export function mdToHtml(mdContent) {
  return mdContent;
  // return remark().use(remarkHtml).processSync(mdContent).toString();
}
