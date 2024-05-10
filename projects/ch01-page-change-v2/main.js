init()

function init() {
  window.addEventListener('hashchange', (evt) => {
    hashChange()
  })
}

// hash 变化处理
function hashChange() {
  let hash = location.hash
  if (hash.startsWith('#')) hash = hash.substr(1)
  change(hash)
}

function change(val) {
  if (val == 'page1') {
    page1()
  } else if (val == 'page2') {
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
