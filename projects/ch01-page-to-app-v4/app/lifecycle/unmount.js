import { PLAY, WAIT } from '../const.js'

export function unmount(app) {
  if (app.status != PLAY) return

  app.unmount()
  app.status = WAIT
}
