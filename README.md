## 背景

当下微前端的应用已是非常普遍了，特别是目前中后台的一些管理系统，达到一定的规模之后，由于业务模块众多，迭代频繁，再加上项目周期长达数年，若还是传统的单页应用，项目每次的迭代更新都得是全量布署，全量布署老鼻子慢了！就这一打包布署，十多分钟就过去了，，，若加上多业务线团队独立迭代跟进的情况，项目布署时，当出现信息差，沟通同步不及时，极大概率就会覆盖上个版本，，，

项目创建初期，我们选择的技术框架肯定比较主流，可一两年两三年后呢？这框架可能就有点跟不上时代发展，需要升级了，可框架升级不是你想升就可以升的，，，咦？之前线上跑的挺欢实挺正常的呀，怎么才一升级，就歇菜了呢？完蛋！难道要走最后一步？删库跑路？

可惜我只是一个小前端，数据库也没资格接触呀！无法删库，毛得后路，，，真惨，，，

好吧，我们重新用新框架再写一遍，总行吧？想都别想，不存在这种可能性！

当你还想用点别的技术栈，老项目原有的技术栈不允许你这么干，你只能在一些小项目里过过手瘾。

，，，

想像力有限，想不出别的了，，，

，，，

而上述的种种问题，在微前端的带领之下，都将得到解决！

拥抱微前端，拥抱未来！

微前端，你值得拥有！

那微前端到底是个啥玩意呢？

他到底是怎么实现的呢？

## 开始

### 准备工作

先来搭个台子，JS 跑起来还是非常方便的，有个浏览器就行

[准备工作](./doc/ch01/start.md)

github 访问太慢怎么办？

[加速访问](./doc/ch01/speed.md)

### 页面切换

单个页面有点单调，我们来尝试一下页面切换

[页面切换 v1](./doc/ch01/page-change-v1.md)

[页面切换 v2](./doc/ch01/page-change-v2.md)

[页面切换 v3](./doc/ch01/page-change-v3.md)

[页面切换 v4](./doc/ch01/page-change-v4.md)

### 动态加载页面

按需动态加载页面

[动态加载页面 v1](./doc/ch01/page-change-async-v1.md)

[动态加载页面 v2](./doc/ch01/page-change-async-v2.md)

[动态加载页面 v3](./doc/ch01/page-change-async-v3.md)

[动态加载页面 v4](./doc/ch01/page-change-async-v4.md)

[动态加载页面 v5](./doc/ch01/page-change-async-v5.md)

### 页面升级为应用

不妨扩展一下页面，我们将页面升级为一个独立的应用，，，

[页面升级为应用 v1](./doc/ch01/page-to-app-v1.md)

[页面升级为应用 v2](./doc/ch01/page-to-app-v2.md)

[页面升级为应用 v3](./doc/ch01/page-to-app-v3.md)

[页面升级为应用 v4](./doc/ch01/page-to-app-v4.md)
### 微前端 DemoV1

这就完成了一个简单的微前端了。
