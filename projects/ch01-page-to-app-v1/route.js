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
        await loadPage(entry)
      }
    }

    if (render) {
      routeMap.set(path, render)
    }
  }
}

let evalCodeMap = new Map()

// 取得 js 代码
function fetchJscript(entry) {
  // 优化多次 fetch
  if (evalCodeMap.has(entry)) return Promise.resolve()

  return fetch(entry).then((res) => {
    if (res.status >= 400) {
      throw new Error(`${entry} 文件加载失败，status 是 ${res.status}`)
    }
    return res.text()
  })
}

// 执行 js 代码
function evalCode(entry, code) {
  let evalFunc = evalCodeMap.get(entry)

  // 优化多次 eval
  if (!evalFunc) {
    const functionWrappedCode = `(function(){${code}})`
    evalFunc = (0, eval)(functionWrappedCode)
    evalCodeMap.set(entry, evalFunc)
  }

  evalFunc.call(window)
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
}

function update(path) {
  if (routeMap.has(path)) {
    // 修改
    const render = routeMap.get(path)
    Promise.resolve().then(render._cache || render)
  }
}
