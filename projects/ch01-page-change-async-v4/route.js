const routeMap = new Map()

function route(config) {
  resolveConfig(config)
  addRouteEvent()
}

const windowProps = new Set()

// 给 window 拍个照
function snapshotWindow() {
  for (let key in window) {
    windowProps.add(key)
  }
}

function findWindowAddProps() {
  for (let key in window) {
    if (windowProps.has(key)) continue
    return window[key]
  }
}

function resolveConfig(config) {
  for (let i = 0; i < config.length; i++) {
    let { path, render, entry } = config[i]
    if (!render && entry) {
      render = async () => {
        snapshotWindow()

        await loadPage(entry)
        const result = findWindowAddProps()

        result()
        // 新增
        render._cache = result

        snapshotWindow()
      }
    }

    if (render) {
      routeMap.set(path, render)
    }
  }
}

// 动态加载页面
function loadPage(entry) {
  return new Promise((resolve, reject) => {
    const node = document.createElement('script')
    node.src = entry
    node.onload = () => {
      resolve()
    }
    document.head.appendChild(node)
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
}

function update(path) {
  if (routeMap.has(path)) {
    // 修改
    const render = routeMap.get(path)
    Promise.resolve().then(render._cache || render)
  }
}
