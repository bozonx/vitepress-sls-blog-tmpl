export const removeH1Plugin = (md) => {
  const render = md.renderer.render.bind(md.renderer)

  md.renderer.render = (tokens, options, env) => {
    const h1OpenIndex = tokens?.findIndex((item) => {
      if (item.type === 'heading_open' && item.tag === 'h1') return true
    })
   
    if (h1OpenIndex >= 0) {
      const h1CloseIndex = tokens.findIndex((item) => {
        if (item.type === 'heading_close' && item.tag === 'h1') return true
      })

      if (h1CloseIndex >= 0) {
        tokens.splice(h1OpenIndex, h1CloseIndex - h1OpenIndex + 1)
      }
    }

    return render(tokens, options, env)
  }
}

