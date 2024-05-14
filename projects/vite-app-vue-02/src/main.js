import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

let app = null

export const mount = () => {
  app = createApp(App)
  app.mount('#app')
}

export const unmount = () => {
  app.unmount()
}
