[返回](/README.md)

### 动态加载页面

简单回顾一下上个版本实现的功能：

当切换到页面 page1 时，根据当时页面的映射配置表，我们委托浏览器帮忙加载页面对应的 js 文件，

然后，就没然后了，，，

此时，函数 update 根据对应的 hash 值，找到的 render 方法执行之后，只完成了页面加载。

接下来就是执行页面对应的 render 函数，更新页面了！

我们来观察一下 page1.js ：

```js
function page1() {
  const container = document.getElementById('app')
  container.innerHTML = '页面1'
}
```

当浏览器顺利加载并执行 page1.js 之后，在对象 window 下就多了一个 page1 方法。

我们完全可以在 js 文件加载完成之后，执行一下方法 page1 即可。

实现如下所示：

```js
function resolveConfig(config) {
  for (let i = 0; i < config.length; i++) {
    let { path, render, entry } = config[i]
    if (!render && entry) {
      // 修改
      render = async () => {
        await loadPage(entry)
        page1()
      }
    }

    if (render) {
      routeMap.set(path, () => Promise.resolve().then(render))
    }
  }
}

// 省略部分代码
```

OK，功能实现了。

接下来，我们把剩下的页面都整成动态按需加载：

```js
const routeConfig = [
  { path: 'page1', entry: './page1.js' },
  { path: 'page2', entry: './page2.js' }, // 修改
  { path: '', entry: './pageHome.js' }, // 修改
]
```

跑一下看看，，，

嗯，程序无法正常运行了！

很显然，这个问题一眼就能看出来。

我们之前写死了页面的渲染的方法。

怎么办呢？

约定一个函数名？比如都取 render ?

也不行，这时就会出现函数覆盖的问题，毕竟大家都是往 window 上放的。

这时，我们就可以引入 ES6 的模块支持了。
