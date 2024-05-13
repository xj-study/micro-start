// 状态
// 一开始为 初始状态
// 激活后进入 加载状态
// 加载完成后进入 就绪状态
// 应用挂载完成后进入 运行状态
// 应用销毁后进入 就绪状态

// 初始状态
export const INIT = 'init'
// 加载状态
export const LOADING = 'loading'
// 就绪状态
export const WAIT = 'wait'
// 运行状态
export const PLAY = 'play'
