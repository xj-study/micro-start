export const load = (url) => {
  console.log('to load ', url)

  import(url).then((module) => {
    console.log('load module', module)
  })
}
