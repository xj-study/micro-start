import { route } from './route.js'
const routeConfig = [
  { path: 'page1', entry: './page1.js' },
  { path: 'page2', entry: './page2.js' },
  { type: 'app', path: 'app-vite', entry: 'http://localhost:4173/my-lib.umd.js' },
  { path: '', entry: './pageHome.js' },
]

route(routeConfig)
