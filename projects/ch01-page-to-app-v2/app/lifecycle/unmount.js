import { PLAY, WAIT } from '../const'

export function unmount(app) {
  if (app.status != PLAY) return

  app.unmount()
  app.status = WAIT
}
