[返回](/README.md)

### 页面升级为应用 v2

上个版本的问题很多，我们一个一个来解决。

先解决切换报错没有显示的问题。

这个就需要一系列的处理了。

不着急，一点点来，，，

我们先区别一下页面跟应用，可以考虑加一个 type 属性：

```js
// main.js
const routeConfig = [
  { path: 'page1', entry: './page1.js' },
  { path: 'page2', entry: './page2.js' },
  { type: 'app', path: 'app-vite', entry: 'http://localhost:4173/assets/index-GTf1oZOv.js' },
  { path: '', entry: './pageHome.js' },
]

route(routeConfig)
```

这样一来，我们就可以通过重构一下函数 resolveConfig 来处理 type 为 app 的配置：

```js
// route.js
import { registerApp, updateApps } from './app/index.js'
// 省略部分代码
function resolveConfig(config) {
  for (let i = 0; i < config.length; i++) {
    // 重构
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
// 省略部分代码
```

函数 registerApp 就不太好继续放 route.js 里了，所以，就创建了一个 app 文件夹，

然后增加了一个 index.js 的文件：

```js
// app/index.js

import { INIT, PLAY } from './const'
import { mount } from './lifecycle/mount'
import { unmount } from './lifecycle/unmount'
// 应用列表
const registerApps = []

// 注册一个应用
export function registerApp(data) {
  const {} = data
  const app = {
    status: INIT,
    ...data,
  }
  registerApps.push(app)
}

// 更新应用
export function updateApps(path) {
  // 找到要销毁的应用
  const needUnmountApps = registerApps.filter((app) => app.status == PLAY && app.path != path)
  needUnmountApps.forEach(unmount)
  // 找到要启用的应用
  const needMountApps = registerApps.filter((app) => app.path == path)
  needMountApps.forEach(mount)
}
```

目前这个模块里有两个函数，

函数 registerApp 给应用增加了一个状态 status 的属性，之后我们将通过维护应用的状态，来完成应用的挂载移除等操作。

先简单为应用定义几个状态：

```js
// app/const.js

// 应用状态

// 初始状态
export const INIT = 'init'
// 加载状态
export const LOADING = 'loading'
// 就绪状态
export const WAIT = 'wait'
// 运行状态
export const PLAY = 'play'
```

应用刚注册的时候，状态为初始态 INIT ，

应用首次激活后，状态将变更为加载状 LOADING ，

应用内容加载完成之后，状态变更为就绪态 WAIT，

应用挂载之后，状态变更为运行态 PLAY ，

应用卸载之后，状态重新变更为就绪态 WAIT 。

当 hashchange 时，就会导致应用的状态变化，处理应用状态变化的函数是 updateApps ，如上述代码。

现在，我们只需要在函数 hashChange 里调用一下 updateApps ：

```js
// route.js

// 省略部分代码

// hash 变化处理
function hashChange() {
  let hash = location.hash
  if (hash.startsWith('#')) hash = hash.substr(1)

  update(hash)
  // 新增
  updateApps(hash)
}
```

我们来看看函数 updateApps 的实现，

首先，我们通过判断遍历注册的应用列表，找出状态为运行态且不是当前路径的应用，然后遍历执行函数 unmount ，函数 unmount 实现如下：

```js
// app/lifecycle/unmount.js
import { PLAY, WAIT } from '../const'

export function unmount(app) {
  if (app.status != PLAY) return

  app.unmount()
  app.status = WAIT
}
```

代码相当简单，不细说了。

类似的操作找出所有要启用的应用，只需要判断应用的 path 是否与当前的 path 一致就行了。然后遍历需要启用的应用列表，执行函数 mount ：

```js
// app/lifecycle/mount.js
import { PLAY, WAIT } from '../const'

export function mount(app) {
  if (app.status != WAIT) return

  app.mount()
  app.status = PLAY
}
```

接下来，顺带整理一下 route.js 里的一些函数，把他们抽离到 app/utils.js 里：

```js
// app/utils.js

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
```

到此，大量重构的一小步完成了。
