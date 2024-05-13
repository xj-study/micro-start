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
