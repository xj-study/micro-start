let evalCodeMap = new Map()

// 取得 js 代码
export function fetchJscript(entry) {
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
