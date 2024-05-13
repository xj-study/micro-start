import { INIT, LOADING, WAIT } from '../const.js'
import { fetchJscript, evalCode, snapshotWindow, findWindowAddProps } from '../utils.js'

export function loading(app) {
  if (app.status != INIT) return Promise.resolve()

  app.status = LOADING

  return fetchJscript(app.entry).then((code) => {
    snapshotWindow()
    evalCode(app.entry, code)
    const result = findWindowAddProps()

    app.mount = result.mount
    app.unmount = result.unmount
    app.status = WAIT

    return app
  })
}
