const routeMap = new Map()

function route(config) {
  resolveConfig(config)
  addRouteEvent()
}

function resolveConfig(config) {
  for (let i = 0; i < config.length; i++) {
    let { path, render, entry } = config[i]
    if (!render && entry) {
      render = async () => {
        const { render } = await loadPage(entry)
        render()
      }
    }

    if (render) {
      routeMap.set(path, () => Promise.resolve().then(render))
    }
  }
}

// 动态加载页面
function loadPage(entry) {
  return import(entry)
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
}

function update(path) {
  if (routeMap.has(path)) {
    routeMap.get(path).call()
  }
}
