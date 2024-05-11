const routeConfig = [
  { path: 'page1', entry: './page1.js' },
  { path: 'page2', render: page2 },
  { path: '', render: pageHome },
]

route(routeConfig)
