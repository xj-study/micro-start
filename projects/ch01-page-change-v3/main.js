const routeConfig = [
  { path: 'page1', render: page1 },
  { path: 'page2', render: page2 },
  { path: 'page3', render: page3 },
  { path: 'page4', render: page4 },
  { path: '', render: pageHome },
]

route(routeConfig)

function page1() {
  const container = document.getElementById('app')
  container.innerHTML = '页面1'
}

function page2() {
  const container = document.getElementById('app')
  container.innerHTML = '页面2'
}

function page3() {
  const container = document.getElementById('app')
  container.innerHTML = '页面3'
}

function page4() {
  const container = document.getElementById('app')
  container.innerHTML = '页面4'
}

function pageHome() {
  const container = document.getElementById('app')
  container.innerHTML = '首页'
}
