[返回](/README.md)

### 页面切换

我们来简单实现一下页面切换

先修改一下 index.html 文件：

```html
<body>
  <div id="app">首页</div>
  <a href="#" onclick="change(1)">页面1</a>
  <a href="#" onclick="change(2)">页面2</a>
  <a href="#" onclick="change()">首页</a>
  <script src="./main.js"></script>
</body>
```

再修改一下 main.js 文件：

```js
function change(val) {
  if (val == 1) {
    page1()
  } else if (val == 2) {
    page2()
  } else {
    pageHome()
  }
}

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

运行效果如下：

<img src="../images/ch01/img002.png" width="350px">

我们可以通过依次点击 页面 1，页面 2，首页 来完成页面内容的切换。
