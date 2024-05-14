import { INIT, PLAY, WAIT, LOADING } from './const.js'
import { loading } from './lifecycle/loading.js'
import { mount } from './lifecycle/mount.js'
import { unmount } from './lifecycle/unmount.js'
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
  // 修改
  needMount(needMountApps)
}

// 新增
function needMount(apps) {
  for (let i = 0; i < apps.length; i++) {
    const app = apps[i]
    const status = app.status
    if (status == INIT) {
      loading(app).then(mount)
    } else if (status == WAIT) {
      mount(app)
    }
  }
}
