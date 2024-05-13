import { registerApp, updateApps } from './app/index.js'
import { evalCode, fetchJscript } from './app/utils.js'
const routeMap = new Map()

export function route(config) {
  resolveConfig(config)
  addRouteEvent()
}

function resolveConfig(config) {
  for (let i = 0; i < config.length; i++) {
    let { type, path, render, entry } = config[i]
    if (type == 'app') {
      // 这里是应用
      registerApp(config[i])
    } else {
      // 这里是页面
      if (!render && entry) {
        render = async () => {
          await loadPage(entry)
        }
      }

      if (render) {
        routeMap.set(path, render)
      }
    }
  }
}

// 动态加载页面
function loadPage(entry) {
  return fetchJscript(entry).then((code) => {
    evalCode(entry, code)
  })
}

function addRouteEvent() {
  window.addEventListener('hashchange', (evt) => {
    hashChange()
  })
}

// hash 变化处理
function hashChange() {
  let hash = location.hash
  if (hash.startsWith('#')) hash = hash.substr(1)

  update(hash)
  // 更新应用的状态
  updateApps(hash)
}

function update(path) {
  if (routeMap.has(path)) {
    // 修改
    const render = routeMap.get(path)
    Promise.resolve().then(render._cache || render)
  }
}
