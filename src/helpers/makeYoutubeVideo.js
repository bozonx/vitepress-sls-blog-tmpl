//import { extractPreviewFromMd } from './parseMdFile.js'

export function makeYoutubeVideo(md) {
  const render = md.renderer.render.bind(md.renderer);

  md.renderer.render = (tokens, options, env) => {
    let res = "";

    for (const item of tokens) {
      if (item.type !== "inline") continue;

      for (const child of item.children || []) {
        if (child.type !== "link_open") continue;
        // console.log(111, child);
        //link_close
      }

      //
      //   // TODO: отфильтровать H1
      //
      //   if (item.type !== 'inline') continue
      //
      //   // TODO: учитывать children - могут быть ссылки
      //
      //   res += item.content
      //
      //   if (res.length > MAX_CHARS) break
    }
    //
    // env.frontmatter.extractedPreview = res

    return render(tokens, options, env);
  };
}
