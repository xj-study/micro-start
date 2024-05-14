let evalCodeMap = new Map()

// 取得 js 代码
export function fetchJscript(entry) {
  return fetchText(entry, evalCodeMap)
}

export function fetchCss(path) {
  return fetchText(path)
}

function fetchText(path, cache) {
  // 优化多次 fetch
  if (cache && cache.has(path)) return Promise.resolve()

  return fetch(path).then((res) => {
    if (res.status >= 400) {
      throw new Error(`${path} 文件加载失败，status 是 ${res.status}`)
    }
    return res.text()
  })
}

// 执行 js 代码
export function evalCode(entry, code) {
  let evalFunc = evalCodeMap.get(entry)

  // 优化多次 eval
  if (!evalFunc) {
    const functionWrappedCode = `(function(){${code}})`
    evalFunc = (0, eval)(functionWrappedCode)
    evalCodeMap.set(entry, evalFunc)
  }

  evalFunc.call(window)
}

const windowProps = new Set()

// 给 window 拍个照
export function snapshotWindow() {
  for (let key in window) {
    windowProps.add(key)
  }
}

export function findWindowAddProps() {
  for (let key in window) {
    if (windowProps.has(key)) continue
    return window[key]
  }
}
