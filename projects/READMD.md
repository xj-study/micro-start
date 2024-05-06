## 前言

当下微前端的应用已是非常普遍了，特别是目前中后台的一些管理系统，达到一定的规模之后，由于业务模块众多，迭代频繁，再加上项目周期长达数年，若还是传统的单页应用，项目每次的迭代更新都得是全量布署，全量布署老鼻子慢了！就这一打包布署，十多分钟就过去了，，，若加上多业务线团队独立迭代跟进的情况，项目布署时，当出现信息差，沟通同步不及时，极大概率就会覆盖上个版本，，，

项目创建初期，我们选择的技术框架肯定比较主流，可一两年两三年后呢？这框架可能就有点跟不上时代发展，需要升级了，可框架升级不是你想升就可以升的，，，咦？之前线上跑的挺欢实挺正常的呀，怎么才一升级，就歇菜了呢？完蛋！难道要走最后一步？删库跑路？

可惜我只是一个小前端，数据库也没资格接触呀！无法删库，毛得后路，，，真惨，，，

好吧，我们重新用新框架再写一遍，总行吧？想都别想，不存在这种可能性！

当你还想用点别的技术栈，老项目原有的技术栈不允许你这么干，你只能在一些小项目里过过手瘾。

，，，

想像力有限，想不出别的了，，，

，，，

而上述的种种不公，在微前端的带领之下，都将得到解决！

拥抱微前端，拥抱未来！

微前端，你值得拥有！

那微前端到底是个啥玩意呢？

他到底是怎么实现的呢？

谁来告诉我！！！

不好意思，在下，一个小小前端，尝试着，来为你我解惑！

对，我这也是边学边练嘛~

## script 的多种打开方式

当我还是孩童的时候，有人告诉我，
你这样就可以学会神技：

```js
<script>
console.log('你好，再见')
</script>
```

我不耻下问的学会了这个技能，然后四处伸张正义，岂料敌强我弱，被打脸，不幸身首异处，
值此濒死绝境之际，灵光一闪，竟领悟了神功第二层：

```js
<script src="./ni-heng-qiang.js"></script>
```

我即刻满血复活，顺手得报大仇！
如此数十载，江湖再无敌手，可惜白发生！
人生才短短数十载，怎能足够？
遥想当年身首分离皆可复原，神功第三层必能助我返老还童!

可能是机缘未到，亦或才智不足，如此追寻数载，神功毫无寸进！
弥留之际，传下神功石碑，望有缘者得之。

自嗨结束，，，

终于迎来了 ES6 的模块化语法，import and export !

```js
// index.html
<script type="module">
import callNB from './nb.js'; 
callNB();
</script>

// nb.js
export function callNB() {
  console.log('Ni heng NB! wo shuo de!')
}
```

嗯，，，

上述的胡言乱语可以忽略了，咱们进入正文。

在掌控微前端之前，我们先来消化一下几个基础的技术点：

### fetch

fetch() 方法是 Fetch API 提供的一个 JS 接口，可以用来异步获取资源。

比如获取一个 js 文件，一个 json 文件，或者是一个 css 文件。

我们先来体验一下获取 js 文件，

首先，整个 html 页面，

```html
<script>
  const url = './index.js'
  fetch(url).then((res) => {
    console.log('fetch 一下')
    // 文本数据
    res.text().then((code) => {
      console.log(code)
    })
  })
</script>
```

注意：只摘取了 body 里的 script 标签内容。

同目录下再整个 js 文件，

```js
// index.js
console.log('Hello in js file')
```

给目录取个名字，就叫 ch01-load 。

然后，浏览器打开

![效果图](./images/image001.png)

嗯？报错了！

浏览器他好心提示我们跨域了。

这个 fetch 函数很友好呀，明明只是通过浏览器打开一个本地的 html 文件，获取的也是本地的一个 js 文件，他竟然提醒我们跨域了！

怎么可能跨域呢？

我们明明走的是 file 协议好吧！

```shell
file:///Users/xiejun/Documents/public/micro-start/projects/ch01-load/index.js
```

我们来仔细看下报错信息：

<font color="red">
CORS policy: Cross origin requests are only supported for protocol schemes: http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.
</font>

他说他那个跨域只支持上面那些协议。
