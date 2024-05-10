[返回](/README.md)

### 动态加载页面

之前我们实现了一个页面切换框架，请允许我称他为框架。

这个框架非常 low，估计不会有人使用，毕竟他每增加一个页面，就得修改三个地方！

为了让这个框架接受度高一点，

于是，我们不得不增加一个新的特性：

动态加载页面！

怎么实现呢？

首先，我们修改一下页面映射表：

```js
// main.js
const routeConfig = [
  { path: 'page1', entry: './page1.js' }, // 修改
  { path: 'page2', render: page2 },
  { path: '', render: pageHome },
]

route(routeConfig)
```

render 这么强大的功能，我们还是要保留一下的。

我们增加一个 entry 属性，用来配置页面的相关文件，比如，页面对应的 js 文件地址。

接下来我们来实现一下动态加载功能：

```js
// route.js

// 省略部分代码

// 修改
function resolveConfig(config) {
  for (let i = 0; i < config.length; i++) {
    let { path, render, entry } = config[i]
    if (!render && entry) {
      render = () => loadPage(entry)
    }

    if (render) {
      routeMap.set(path, () => Promise.resolve().then(render))
    }
  }
}
// 新增
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

// 省略部分代码
```

我们通过实现一个新函数 loadPage 来完成页面 js 文件的动态加载，

然后，重构一下函数 resolveConfig ，当页面配置对象没有配置 render 而只配置了 entry 时，就设置一下 render 的值：

```js
if (!render && entry) {
  render = () => loadPage(entry)
}
```

顺手将 routeMap 里的值也包装一下：

```js
routeMap.set(path, () => Promise.resolve().then(render))
```

这样 render 值的形为更统一一点。

这时，我们切换到 page1 ，页面内容是不会变化的，

我们现在只实现了动态加载页面，当执行函数 update 时，对应页面的 render 处理函数并没有执行。

就这需要放到下个版本里实现了。
