//import { extractPreviewFromMd } from './parseMdFile.js'

export const extractPreviewTextPlugin = (md) => {
  const render = md.renderer.render.bind(md.renderer);

  // TODO: взять из конфига
  const MAX_CHARS = 150;

  md.renderer.render = (tokens, options, env) => {
    let res = "";

    //console.log(111, tokens)

    for (const item of tokens) {
      // TODO: отфильтровать H1

      if (item.type !== "inline") continue;

      // TODO: учитывать children - могут быть ссылки

      res += item.content;

      if (res.length > MAX_CHARS) break;
    }

    env.frontmatter.extractedPreview = res;

    return render(tokens, options, env);
  };
};
