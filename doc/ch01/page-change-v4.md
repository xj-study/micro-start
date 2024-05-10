[返回](/README.md)

### 页面切换 v4

所有页面逻辑都写在一个 main.js 文件里，有点不太合适，对我们的开发阶段不太友好。

所以，我们这么处理一下：

```js
// main.js
const routeConfig = [
  { path: 'page1', render: page1 },
  { path: 'page2', render: page2 },
  { path: '', render: pageHome },
]

route(routeConfig)
```

我们将 main.js 里面的页面函数都抽离出来，为每个函数创建一个对应的文件，如下示例：

```js
// page1.js
function page1() {
  const container = document.getElementById('app')
  container.innerHTML = '页面1'
}
```

然后，再去 index.html 里引一下：

```html
<body>
  <div id="app">首页</div>
  <a href="#page1">页面1</a>
  <a href="#page2">页面2</a>
  <a href="#">首页</a>
  <script src="./route.js"></script>
  <script src="./pageHome.js"></script>
  <script src="./page1.js"></script>
  <script src="./page2.js"></script>
  <script src="./main.js"></script>
</body>
```

运行效果如下：

![图片](../images/ch01/img002.png)

我们可以通过点击那几个链接完成页面的切换。

运行效果与之前几个版本的是一样的。

这样一来，我们每增加一个页面，就得修改三个地方，虽然做起来一目了然，就是感觉有点 low ，也不太智能，步骤有点繁琐。
