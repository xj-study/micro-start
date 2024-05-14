import { PLAY, WAIT } from '../const.js'

export function mount(app) {
  if (app.status != WAIT) return

  app.mount()
  app.status = PLAY
}
