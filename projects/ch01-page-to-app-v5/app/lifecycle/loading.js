import { INIT, LOADING, WAIT } from '../const.js'
import { fetchJscript, evalCode, snapshotWindow, findWindowAddProps, fetchCss } from '../utils.js'

export function loading(app) {
  if (app.status != INIT) return Promise.resolve()

  app.status = LOADING

  return fetchEntry(app.entry).then((code) => {
    snapshotWindow()
    evalCode(app.entry, code)
    const result = findWindowAddProps()

    app.mount = result.mount
    app.unmount = result.unmount
    app.status = WAIT

    return app
  })
}

function fetchEntry(entry) {
  const { main, style } = entry

  // 加载 style 样式
  fetchCss(style).then((code) => {
    // const sheet = new CSSStyleSheet()
    // sheet.replaceSync(code)
    // document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]

    const node = document.createElement('style')
    node.setAttribute('type', 'text/css')
    node.textContent = code
    document.head.appendChild(node)
  })

  return fetchJscript(main)
}
