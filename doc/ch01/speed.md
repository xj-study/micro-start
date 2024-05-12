
[返回](/README.md)

### github 访问加速

由于 github 服务器在海外，很远，域名解析会很费时间，

所以，我们可以直接修改 host ，减少 DNS 的时间，

这时我们可以通过下面这个网站来看看 github 的 ip:

```shell
https://ip138.com/
```
然后修改一下 hosts 配置：

```shell
sudo vi /etc/hosts
```

以下为示例：
```shell
20.205.243.166 github.com
185.199.111.133 raw.githubusercontent.com
```

最后再更新一下本地的 DNS ：

```shell
sudo killall -HUP mDNSResponder
```