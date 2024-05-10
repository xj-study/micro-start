[返回](../README.md)

### 页面切换 v3

对于[页面切换 v2](./01-page-change-v2.md) ，我有点不太满意，比如函数 change。

函数 change 里一串的 if else ，看着有点难受。

所以，整了一个 v3 ， 来解决一下。

首先，我们先抽离一个 route.js 模块：

```js
const routeMap = new Map()

function route(config) {
  resolveConfig(config)
  addRouteEvent()
}

function resolveConfig(config) {
  for (let i = 0; i < config.length; i++) {
    const { path, render } = config[i]
    routeMap.set(path, render)
  }
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
```

这里简单解释一下，代码其实也很简单。

函数 route 是入口，主要完成下面的功能，

解析处理一下传入的 config 参数，这个 config 参数是一个数组，用来让用户页面映射配置的，比如：

```js
// main.js
const routeConfig = [
  { path: 'page1', render: page1 },
  { path: 'page2', render: page2 },
  { path: '', render: pageHome },
]

route(routeConfig)

function page1() {
  const container = document.getElementById('app')
  container.innerHTML = '页面1'
}

function page2() {
  const container = document.getElementById('app')
  container.innerHTML = '页面2'
}

function pageHome() {
  const container = document.getElementById('app')
  container.innerHTML = '首页'
}
```

这样一来，main.js 模块一下清爽多了，只剩下针对页面内容渲染及页面路由映射配置的部分了。

通过解析 config 数组，将对应的数据添加到 routeMap 对象里，最后在函数 hashChange 里调用一下函数 update 。

函数 update 的实现非常简单，根据传入的 path 去 routeMap 里找一下，若找到了，就执行对应的函数。

函数 change 就这样被干掉了。

当然，我们还需要在 index.html 里引一下 route.js 文件：

```html
<body>
  <div id="app">首页</div>
  <a href="#page1">页面1</a>
  <a href="#page2">页面2</a>
  <a href="#">首页</a>
  <!-- 新增 -->
  <script src="./route.js"></script>
  <script src="./main.js"></script>
</body>
```

运行效果如下：

![图片](./images/ch01/img002.png)

我们可以通过点击那几个链接完成页面的切换。

现在，我们可以快速新增页面了：

```html
<body>
  <div id="app">首页</div>
  <a href="#page1">页面1</a>
  <a href="#page2">页面2</a>
  <!-- 新增 -->
  <a href="#page3">页面3</a>
  <a href="#page4">页面4</a>

  <a href="#">首页</a>
  <script src="./route.js"></script>
  <script src="./main.js"></script>
</body>
```

然后，在 main.js 简单的处理一下：

```js
const routeConfig = [
  { path: 'page1', render: page1 },
  { path: 'page2', render: page2 },
  // 新增
  { path: 'page3', render: page3 },
  { path: 'page4', render: page4 },

  { path: '', render: pageHome },
]

route(routeConfig)

function page1() {
  const container = document.getElementById('app')
  container.innerHTML = '页面1'
}

function page2() {
  const container = document.getElementById('app')
  container.innerHTML = '页面2'
}
// 新增
function page3() {
  const container = document.getElementById('app')
  container.innerHTML = '页面3'
}

// 新增
function page4() {
  const container = document.getElementById('app')
  container.innerHTML = '页面4'
}

function pageHome() {
  const container = document.getElementById('app')
  container.innerHTML = '首页'
}
```

大家注意了，我们上面虽然增加了页面，但是，我们不需要再去修改模块 route 了，这非常符合一个正常程序员的直觉。

所以页面都写在一个 main.js 是不太好维护的，这是一个问题。
