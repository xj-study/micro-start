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
