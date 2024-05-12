[返回](/README.md)

### 动态加载页面 v5

总是往全局作用域里放一些乱七八糟的，心里感觉还是有点不太安稳。

得整点别的策略。

我们可以自己把 js 文件加载下来，然后执行一下：

```js
// route.js
// 取得 js 代码
function fetchJscript(entry) {
  return fetch(entry).then((res) => {
    if (res.status >= 400) {
      throw new Error(`${entry} 文件加载失败，status 是 ${res.status}`)
    }
    return res.text()
  })
}

// 执行 js 代码
function evalCode(code) {
  const functionWrappedCode = `(function(){${code}})`
  const evalFunc = (0, eval)(functionWrappedCode)
  evalFunc.call(window)
}

// 动态加载页面
function loadPage(entry) {
  return fetchJscript(entry).then((code) => {
    evalCode(code)
  })
}
```

如上述代码所示，我们通过 fetch 取得 js 文件中的代码，

然后使用 eval 执行取得的代码。

通过 `function(){}` 包裹之后，也不会污染全局作用域，就体现了一个字，安全。

然后，修改一下函数 resolveConfig ：

```js
function resolveConfig(config) {
  for (let i = 0; i < config.length; i++) {
    let { path, render, entry } = config[i]
    if (!render && entry) {
      render = async () => {
        // snapshotWindow()

        await loadPage(entry)
        // const result = findWindowAddProps()

        // result()
        // 新增
        // render._cache = result

        // snapshotWindow()
      }
    }

    if (render) {
      routeMap.set(path, render)
    }
  }
}
```

加载好代码之后，顺带就执行了其中的代码，

不过，目前还有个问题，那就是如下页面代码：

```js
function page1() {
  const container = document.getElementById('app')
  container.innerHTML = '页面1'
}
```

函数 page1 并没有执行，怎么办呢？

那我们可不可以把 page1 整成立即执行函数呢？

如下所示：

```js
;(function page1() {
  const container = document.getElementById('app')
  container.innerHTML = '页面1'
})()
```

顺带也改造一下其它页面，

运行一下，

效果非常好。

功能已经完成，接下来优化一下：

```js
// route.js
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
```

主要优化了两个地方，

通过将 eval 执行得到的函数与 entry 保存下来，然后在函数 fetchJscript 执行前判断一下对应的函数值是否存在，来优化多次加载问题；

然后，在函数 evalCode 中，优化取 evalCodeMap 里保存的函数，进一步优化了 eval 多次执行问题。

运行测试一下，效果很好。


